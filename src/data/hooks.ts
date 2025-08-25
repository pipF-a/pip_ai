
export interface HookItem {
  name: string;
  description: string;
  hint?:string;
}

export interface Icon {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface HooksData {
  hooks: HookItem[];
  icon:Icon
}

export const getHooksData = (isDarkMode: boolean): HooksData => ({
  hooks: [
    { name: 'useState',description:'コンポーネントの中で値を保存・更新できるフック(コンポーネント専用のメモ帳)'  },
    { name: 'useEffect',description:'コンポーネントの描画後に副作用（サイドエフェクト）を実行するためのフック(画面に表示されたあとにやりたい処理（データ取得・イベント登録・タイマー設定など）を置く場所)'  },
    { name: 'useMemo',description:'計算結果をメモ化して、再レンダリングのたびに無駄な再計算を防ぐフック(重い計算の答えをノートに書いておいて、入力が変わらない限りそのノートを見返すだけにする)'  },
    { name: 'useCallback',description:'関数をメモ化して、同じ関数インスタンスを再利用できるようにするフック(毎回新しい関数を作るんじゃなくて、条件が変わらなければ前に作った関数をそのまま使う)',hint:'主に子コンポーネントの再レンダリング防止に使用'  },
    { name: 'useLayoutEffect',description:'DOM が更新された直後、ブラウザが画面を描画する前に同期的に処理を実行するフック(レイアウト計測やスクロール位置調整など描画前に確実に処理したい場合のみ使う)',hint:'普段はuseEffectで十分で、レイアウト計測やスクロール位置調整など描画前に確実に処理したい場合だけ使用'  },
    { name: 'useTransition',description:'状態更新を“急ぎの更新”と“遅らせてもいい更新”に分けて、UIをスムーズに保つためのフック',hint:'検索フィルターや大きなリストの切り替えで使用される'  },
    { name: 'useDeferredValue',description:'重い状態の更新を少し遅らせて、UIの操作をスムーズに保つフック(入力中の文字はすぐ反映するけど、その文字を使った検索処理はちょっと後でやる)' },
    { name: 'useId',description:'サーバーとクライアントで一貫したユニークな ID を生成するフック',hint:'id 属性が必要なフォームやアクセシビリティ対応に便利' }
  ],
  icon:{ src: isDarkMode ? "/react_dark.svg" : "/react_light.svg", alt: "React", width: 24, height: 24 },
});
