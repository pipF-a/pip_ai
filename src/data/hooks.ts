
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
      codeExample: `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>＋1</button>
    </div>
  );
}`
    },
    { 
      name: 'useEffect',
      description: 'コンポーネントの描画後に副作用（サイドエフェクト）を実行するためのフック(画面に表示されたあとにやりたい処理（データ取得・イベント登録・タイマー設定など）を置く場所)',
      fileName: 'useEffect.tsx',
      codeExample: `import { useState, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  // count が変わるたびに実行される
  useEffect(() => {
    console.log(\`カウントが変わりました: \${count}\`);
  }, [count]);

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>＋1</button>
    </div>
  );
}`
    },
    { 
      name: 'useMemo',
      description: '計算結果をメモ化して、再レンダリングのたびに無駄な再計算を防ぐフック(重い計算の答えをノートに書いておいて、入力が変わらない限りそのノートを見返すだけにする)',
      hint:'デフォルトでは使わない → 重い処理や子コンポーネントの無駄な再描画が気になるときに投入する',
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
      codeExample: `import { useState, useCallback } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  // 関数をメモ化（再レンダリング時に毎回新しく作られないようにする）
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={increment}>＋1</button>
    </div>
  );
}`
    },
    { 
      name: 'useLayoutEffect',
      description: 'DOM が更新された直後、ブラウザが画面を描画する前に同期的に処理を実行するフック(レイアウト計測やスクロール位置調整など描画前に確実に処理したい場合のみ使う)',
      hint: '普段はuseEffectで十分で、レイアウト計測やスクロール位置調整など描画前に確実に処理したい場合だけ使用',
      fileName: 'useLayoutEffect.tsx',
      codeExample: `import { useState, useLayoutEffect, useRef } from "react";

export default function Chat() {
  const [messages, setMessages] = useState(["こんにちは", "元気？"]);
  const bottomRef = useRef(null);

  // メッセージが増えたらスクロールを一番下に移動
  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div style={{ height: "120px", overflowY: "auto", border: "1px solid gray" }}>
      {messages.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))}
      <div ref={bottomRef} />
      <button onClick={() => setMessages(prev => [...prev, "新しいメッセージ"])}>追加</button>
    </div>
  );
}`
    },
    { 
      name: 'useTransition',
      description: '状態更新を"急ぎの更新"と"遅らせてもいい更新"に分けて、UIをスムーズに保つためのフック',
      hint: '検索フィルターや大きなリストの切り替えで使用される',
      fileName: 'useTransition.tsx',
      codeExample: `import { useState, useTransition } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // 重いリスト更新を「後回し」にする
    startTransition(() => {
      const items = Array.from({ length: 20000 }, (_, i) => \`\${value} - アイテム\${i}\`);
      setList(items);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="検索..." />
      {isPending && <p>更新中...</p>}
      <ul>
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}`
    },
    { 
      name: 'useDeferredValue',
      description: '重い状態の更新を少し遅らせて、UIの操作をスムーズに保つフック(入力中の文字はすぐ反映するけど、その文字を使った検索処理はちょっと後でやる)',
      fileName: 'useTransition.tsx',
      codeExample: `import { useState, useDeferredValue } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query); // 入力を遅延させる

  const list = Array.from({ length: 20000 }, (_, i) => \`\${deferredQuery} - アイテム\${i}\`);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索..."
      />
      <ul>
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}`
    },
    { 
      name: 'useId',
      description: 'サーバーとクライアントで一貫したユニークな ID を生成するフック',
      hint: '主にid 属性が必要なフォームやアクセシビリティ対応に便利',
      fileName: 'useId.tsx',
      codeExample: `import { useId } from "react";

export default function Form() {
  const id = useId(); // 一意なIDを作成

  return (
    <div>
      <label htmlFor={id}>名前:</label>
      <input id={id} type="text" />
    </div>
  );
}`
    }
  ],
  icon: { src: isDarkMode ? "/react_dark.svg" : "/react_light.svg", alt: "React", width: 24, height: 24 },
});
