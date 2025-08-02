import { NextRequest, NextResponse } from "next/server";

export const middleware = <T>(asyncFn: (req: NextRequest) => Promise<T>) => {
  return async (req: NextRequest): Promise<T | NextResponse> => {
    return await asyncFn(req).catch((error) => {
      console.error("Analysis error:", error);
      return NextResponse.json(
        { error: "分析中にエラーが発生しました" },
        { status: 500 }
      );
    });
  };
};
