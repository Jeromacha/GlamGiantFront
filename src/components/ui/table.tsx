import { ReactNode } from "react";

type TableProps = {
  headers: string[];
  children: ReactNode;
};

export default function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-[#DAA85B] text-left text-white bg-black">
        <thead className="bg-[#330800] text-title">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-4 py-2 border-b border-[#DAA85B]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
