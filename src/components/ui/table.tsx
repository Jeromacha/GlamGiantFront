import { ReactNode } from "react";

type TableProps = {
  headers: string[];
  children: ReactNode;
};

export default function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-[#FFD700] text-left text-white bg-black">
        <thead className="bg-[#330800] text-[#FFD700]">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-4 py-2 border-b border-[#FFD700]">
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
