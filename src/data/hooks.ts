
export interface HookItem {
  name: string;
  description: string;
  hint?: string;
  fileName:string;
  codeExample: string;
}

export interface Icon {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface HooksData {
  hooks: HookItem[];
  icon: Icon;
}

export const getHooksData = (isDarkMode: boolean): HooksData => ({
  hooks: [
    { 
      name: 'useState',
      description: 'コンポーネントの中で値を保存・更新できるフック(コンポーネント専用のメモ帳)',
      fileName: 'useState.tsx',
      codeExample: `import { useState } from 'react';

      function Counter() {
        const [count, setCount] = useState(0);
        
        return (
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">Count: {count}</p>
            <div className="space-x-2">
              <button 
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Increment
              </button>
              <button 
                onClick={() => setCount(count - 1)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Decrement
              </button>
            </div>
          </div>
        );
      }`
    },
    { 
      name: 'useEffect',
      description: 'コンポーネントの描画後に副作用（サイドエフェクト）を実行するためのフック(画面に表示されたあとにやりたい処理（データ取得・イベント登録・タイマー設定など）を置く場所)',
      fileName: 'useEffect.tsx',
      codeExample: `import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
}`
    },
    { 
      name: 'useMemo',
      description: '計算結果をメモ化して、再レンダリングのたびに無駄な再計算を防ぐフック(重い計算の答えをノートに書いておいて、入力が変わらない限りそのノートを見返すだけにする)',
      fileName: 'useMemo.tsx',
      codeExample: `import { useMemo, useState } from 'react';

function ExpensiveCalculation({ numbers }) {
  const [filter, setFilter] = useState('');
  
  // 重い計算をメモ化
  const filteredNumbers = useMemo(() => {
    console.log('Calculating filtered numbers...');
    return numbers.filter(num => 
      num.toString().includes(filter)
    );
  }, [numbers, filter]);
  
  const sum = useMemo(() => {
    console.log('Calculating sum...');
    return filteredNumbers.reduce((acc, num) => acc + num, 0);
  }, [filteredNumbers]);
  
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter numbers..."
        className="px-3 py-2 border rounded"
      />
      <p>Filtered numbers: {filteredNumbers.join(', ')}</p>
      <p>Sum: {sum}</p>
    </div>
  );
}`
    },
    { 
      name: 'useCallback',
      description: '関数をメモ化して、同じ関数インスタンスを再利用できるようにするフック(毎回新しい関数を作るんじゃなくて、条件が変わらなければ前に作った関数をそのまま使う)',
      hint: '主に子コンポーネントの再レンダリング防止に使用',
      fileName: 'useCallback.tsx',
      codeExample: `import { useCallback, useState } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // 関数をメモ化して子コンポーネントの再レンダリングを防ぐ
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // 依存配列が空なので、この関数は再作成されない
  
  const handleTextChange = useCallback((newText) => {
    setText(newText);
  }, []); // 依存配列が空なので、この関数は再作成されない
  
  return (
    <div className="space-y-4">
      <div>
        <p>Count: {count}</p>
        <button 
          onClick={handleIncrement}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Increment
        </button>
      </div>
      <ChildComponent 
        onIncrement={handleIncrement}
        onTextChange={handleTextChange}
      />
    </div>
  );
}

function ChildComponent({ onIncrement, onTextChange }) {
  console.log('ChildComponent rendered');
  
  return (
    <div className="p-4 border rounded">
      <input
        type="text"
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Type something..."
        className="px-3 py-2 border rounded"
      />
    </div>
  );
}`
    },
    { 
      name: 'useLayoutEffect',
      description: 'DOM が更新された直後、ブラウザが画面を描画する前に同期的に処理を実行するフック(レイアウト計測やスクロール位置調整など描画前に確実に処理したい場合のみ使う)',
      hint: '普段はuseEffectで十分で、レイアウト計測やスクロール位置調整など描画前に確実に処理したい場合だけ使用',
      fileName: 'useLayoutEffect.tsx',
      codeExample: `import { useLayoutEffect, useRef, useState } from 'react';

function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);
  const buttonRef = useRef(null);
  
  // スクロール位置を監視
  useLayoutEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // ボタンクリック時にスクロール位置を調整
  const scrollToTop = useLayoutEffect(() => {
    if (buttonRef.current) {
      // 描画前にスクロール位置を調整
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, []);
  
  return (
    <>
      {showButton && (
        <button
          ref={buttonRef}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg"
        >
          ↑
        </button>
      )}
    </>
  );
}`
    },
    { 
      name: 'useTransition',
      description: '状態更新を"急ぎの更新"と"遅らせてもいい更新"に分けて、UIをスムーズに保つためのフック',
      hint: '検索フィルターや大きなリストの切り替えで使用される',
      fileName: 'useTransition.tsx',
      codeExample: `import { useTransition, useState, useMemo } from 'react';

function SearchFilter() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [filteredItems, setFilteredItems] = useState([]);
  
  // 大量のアイテムをフィルタリング
  const items = useMemo(() => {
    return Array.from({ length: 10000 }, (_, i) => \`Item \${i}\`);
  }, []);
  
  const handleSearch = (searchQuery) => {
    // 入力は即座に反映（急ぎの更新）
    setQuery(searchQuery);
    
    // フィルタリングは遅らせてもいい更新
    startTransition(() => {
      const filtered = items.filter(item => 
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    });
  };
  
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search items..."
        className="px-3 py-2 border rounded w-full"
      />
      
      {isPending && (
        <div className="text-blue-500">Searching...</div>
      )}
      
      <div className="max-h-96 overflow-y-auto">
        {filteredItems.map((item, index) => (
          <div key={index} className="p-2 border-b">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}`
    },
    { 
      name: 'useDeferredValue',
      description: '重い状態の更新を少し遅らせて、UIの操作をスムーズに保つフック(入力中の文字はすぐ反映するけど、その文字を使った検索処理はちょっと後でやる)',
      fileName: 'useTransition.tsx',
      codeExample: `import { useDeferredValue, useState, useMemo } from 'react';

function DeferredSearch() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  // 遅延されたクエリを使用してフィルタリング
  const filteredItems = useMemo(() => {
    const items = Array.from({ length: 1000 }, (_, i) => \`Item \${i}\`);
    
    if (!deferredQuery) return items;
    
    return items.filter(item => 
      item.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [deferredQuery]);
  
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search..."
        className="px-3 py-2 border rounded w-full"
      />
      
      <div className="text-sm text-gray-500">
        {query !== deferredQuery ? 'Searching...' : 'Results ready'}
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {filteredItems.map((item, index) => (
          <div key={index} className="p-2 border-b">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}`
    },
    { 
      name: 'useId',
      description: 'サーバーとクライアントで一貫したユニークな ID を生成するフック',
      hint: '主にid 属性が必要なフォームやアクセシビリティ対応に便利',
      fileName: 'useId.tsx',
      codeExample: `import { useId } from 'react';

function FormWithIds() {
  const emailId = useId();
  const passwordId = useId();
  const checkboxId = useId();
  
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor={emailId} className="block text-sm font-medium">
          Email
        </label>
        <input
          id={emailId}
          type="email"
          className="mt-1 px-3 py-2 border rounded w-full"
          placeholder="Enter your email"
        />
      </div>
      
      <div>
        <label htmlFor={passwordId} className="block text-sm font-medium">
          Password
        </label>
        <input
          id={passwordId}
          type="password"
          className="mt-1 px-3 py-2 border rounded w-full"
          placeholder="Enter your password"
        />
      </div>
      
      <div className="flex items-center">
        <input
          id={checkboxId}
          type="checkbox"
          className="mr-2"
        />
        <label htmlFor={checkboxId} className="text-sm">
          Remember me
        </label>
      </div>
      
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}`
    }
  ],
  icon: { src: isDarkMode ? "/react_dark.svg" : "/react_light.svg", alt: "React", width: 24, height: 24 },
});
