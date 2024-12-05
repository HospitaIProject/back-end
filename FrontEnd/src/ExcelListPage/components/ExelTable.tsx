import Loading from '../../components/common/Loading';
import { ExelType } from '../../models/ExelType';

interface Props {
    data?: ExelType[];
    isPending: boolean;
    handleToggleSelectAll: () => void;
    handleSelect: (id: number) => void;
    selectedIds: number[];
}
function ExelTable({ data, isPending, handleToggleSelectAll, handleSelect, selectedIds }: Props) {
    return (
        <table className="table-auto border-collapse border-t text-center text-sm">
            <thead className="">
                <tr className="bg-blue-50 text-gray-500">
                    <th className="cursor-pointer py-2 pl-3 pr-2 hover:bg-gray-100" onClick={handleToggleSelectAll}>
                        <input type="checkbox" checked={selectedIds.length === data?.length} readOnly />
                    </th>
                    <th className="px-1 py-3 text-center font-normal">환자</th>
                    <th className="px-1 py-3 text-center font-normal">등록번호</th>
                    <th className="px-1 py-3 text-center font-normal">수술명</th>
                    <th className="py-2 pl-2 pr-3 text-center font-normal">수술일</th>
                </tr>
            </thead>
            <tbody>
                {isPending && (
                    <tr>
                        <td colSpan={5} className="h-64 p-4">
                            <Loading text="환자 데이터를 불러오는 중입니다..." />
                        </td>
                    </tr>
                )}
                {data?.length === 0 && (
                    <tr>
                        <td colSpan={5} className="h-64 p-4 text-center text-gray-400">
                            데이터가 없습니다.
                        </td>
                    </tr>
                )}

                {data?.map((item) => (
                    <tr
                        key={item.operationId}
                        className="cursor-pointer border-b text-xs hover:bg-gray-50 mobile:text-sm"
                        onClick={() => {
                            handleSelect(item.operationId);
                        }}
                    >
                        <td className="py-2 pl-3 pr-2">
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(item.operationId)}
                                readOnly
                                className="cursor-pointer"
                            />
                        </td>

                        <td className="px-1 py-2 text-center text-gray-600">{item.name}</td>
                        <td className="px-1 py-2 text-center text-gray-600">{item.patientNumber}</td>
                        <td className="px-1 py-2 text-center text-gray-600">{item.operationTypeNames.join(', ')}</td>
                        <td className="py-2 pl-2 pr-3 text-center text-gray-600">
                            {item.operationDate.replace(/-/g, '.')}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ExelTable;
