# introduction

@/.clinerules/product-context.md
を読んでプロダクトコンテキストをよく理解してください。
UI 部分はほぼ完成です。
ここからは実際に機能を組み込んでいかねばなりません。

## 計画

このプロジェクトに大きく 2 つの部分に AI を活用します。

### Chat 部分

Chat 部分は @/src/app/exercise/chat のことを指しています。
ユーザーは AI と対話し、説得を試み、Open AI がそれに答えます。
このプロセスでは、Open AI が streamText を返します。
stream にすることによって、ユーザーはまるで本当に会話をしているかのようにリアルタイムの体験が得られます。

### Result 部分

Result 部分は @/src/app/exercise/result のことを指しています。
ユーザーは Chat 部分で行った対話の内容の分析結果を得ることができます。
このプロセスでは、Open AI が構造化された object を返します。
stream である必要はありません。
