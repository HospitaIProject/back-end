import InfoIcons from '../icons/InfoIcons';
import { useExcelQuery } from './_lib/excelService';
import { saveAs } from 'file-saver';

function ExcelListPage() {
    const excelQuery = useExcelQuery({ enabled: false });
    const { refetch } = excelQuery;

    const handleDownload = async () => {
        const { data } = await refetch();

        if (data) {
            const blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            saveAs(blob, 'data.xlsx');
            // console.log(data);
        }
    };

    return (
        <div className={`flex w-full flex-grow flex-col gap-4 bg-white p-4`}>
            <span className="mx-auto font-semibold text-red-500">테스트 중입니다. 제대로 작동하지 않음</span>

            <div className="relative flex flex-col items-center p-4 mb-4 text-sm text-gray-800 border border-gray-300 border-dotted rounded-md">
                <div className="flex flex-col w-fit">
                    <span>
                        - <span className="font-semibold text-green-600">각 환자</span>를 선택하여&nbsp;
                        <span className="font-semibold text-green-600">액셀로 추출</span>할 수 있습니다.
                    </span>
                    <span>
                        - 액셀은 체크리스트가&nbsp;
                        <span className="font-semibold text-green-600">D+3 까지 작성이 완료된 경우 </span>
                        추출됩니다.
                    </span>
                </div>
                <InfoIcons className="absolute w-6 h-6 text-yellow-400 -left-2 -top-2" />
            </div>
            <div className="flex justify-end gap-4">
                {/* <button className="p-2 text-sm font-medium text-white bg-gray-400 rounded-md">선택 받기</button> */}
                <button onClick={handleDownload} className="p-2 text-sm font-medium text-white bg-gray-600 rounded-md">
                    전체 받기
                </button>
            </div>

            <table className="text-xs text-center border border-collapse border-gray-200 table-auto">
                <thead>
                    <tr className="bg-blue-100">
                        <th className="p-2 border border-gray-300">
                            <input type="checkbox" />
                        </th>

                        <th className="p-2 border border-gray-300">환자</th>
                        <th className="p-2 border border-gray-300">등록번호</th>
                        <th className="p-2 border border-gray-300">수술명</th>
                        <th className="p-2 border border-gray-300">수술일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2 border border-gray-300">
                            <input type="checkbox" />
                        </td>

                        <td className="p-2 border border-gray-300">고민시</td>
                        <td className="p-2 border border-gray-300">20181011</td>
                        <td className="p-2 border border-gray-300"></td>
                        <td className="p-2 border border-gray-300">데이터 1-3</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ExcelListPage;
