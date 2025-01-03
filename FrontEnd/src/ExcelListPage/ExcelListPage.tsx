import InfoIcons from '../icons/InfoIcons';
import { useExcelQuery, useExcelsQuery } from './_lib/excelService';
import { saveAs } from 'file-saver';
import ExelDatePicker from './components/ExelDatePicker';
import ExelTable from './components/ExelTable';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import DownLoadIcon from '../icons/DownLoadIcon';

function ExcelListPage() {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(dayjs(new Date()).date(1).toDate());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    const excelsQuery = useExcelsQuery({
        startDate: dayjs(startDate).format('YYYY-MM-DD'),
        endDate: dayjs(endDate).format('YYYY-MM-DD'),
    });
    const excelQuery = useExcelQuery({ enabled: false, operationIds: selectedIds });
    const { refetch } = excelQuery;
    const { data: excelsData, isPending: isExcelsPending } = excelsQuery;
    useEffect(() => {
        if (excelsData) {
            console.log('xx', excelsData);
        }
    }, [excelsData]);

    const handleDownload = async () => {
        if (!selectedIds.length) {
            alert('선택된 환자가 없습니다.');
            return;
        }
        if (confirm('다운로드 하시겠습니까?') === false) return;
        console.log('selectedIds', selectedIds);
        const { data } = await refetch();

        if (data) {
            const excelData = data.data;
            const fileName = data.fileName;
            const blob = new Blob([excelData], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            saveAs(blob, fileName);
            console.log(data);
        }
    };

    const handleSelect = (id: number) => {
        setSelectedIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((i) => i !== id);
            }
            return [...prev, id];
        });
    };
    const handleToggleSelectAll = () => {
        if (!excelsData) return;
        if (excelsData?.length === selectedIds.length) {
            // 모두 선택된 상태라면 해제
            setSelectedIds([]);
        } else {
            // 일부 선택 또는 아무것도 선택되지 않은 상태라면 전체 선택
            setSelectedIds(excelsData.map((item) => item.operationId));
        }
    };
    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
    };
    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };
    const handleRangeChange = (range: number) => {
        if (range === -1) {
            setStartDate(new Date('1999-08-10'));
            setEndDate(new Date());
            return;
        }
        const newStartDate = dayjs(new Date())
            .subtract(range - 1, 'day')
            .toDate();
        setStartDate(newStartDate);
        setEndDate(new Date());
    };

    return (
        <div className={`flex w-full flex-grow flex-col gap-3 bg-white py-3`}>
            <div className="relative mx-3 flex flex-col items-center rounded-md border border-dotted border-gray-300 p-4 text-sm text-gray-800">
                <div className="flex w-fit flex-col">
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
                <InfoIcons className="absolute -left-2 -top-2 h-6 w-6 text-yellow-400" />
            </div>
            <div className="flex w-full items-center justify-center gap-2 px-2">
                <ExelDatePicker onChange={handleDateChange} date={startDate} />
                <span>~</span>
                <ExelDatePicker onChange={handleEndDateChange} date={endDate} />
            </div>
            <div className="mx-2 flex justify-end gap-2">
                <div className="flex flex-grow flex-wrap gap-1">
                    <button
                        type="button"
                        onClick={() => handleRangeChange(7)}
                        className="flex flex-shrink-0 items-center justify-center rounded-full border bg-gray-50 px-3 py-1 text-sm text-gray-500 hover:border-blue-400"
                    >
                        7일
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRangeChange(30)}
                        className="flex flex-shrink-0 items-center justify-center rounded-full border bg-gray-50 px-3 py-1 text-sm text-gray-500 hover:border-blue-400"
                    >
                        30일
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRangeChange(90)}
                        className="flex flex-shrink-0 items-center justify-center rounded-full border bg-gray-50 px-3 py-1 text-sm text-gray-500 hover:border-blue-400"
                    >
                        90일
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRangeChange(365)}
                        className="flex flex-shrink-0 items-center justify-center rounded-full border bg-gray-50 px-3 py-1 text-sm text-gray-500 hover:border-blue-400"
                    >
                        1년
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRangeChange(-1)}
                        className="flex flex-shrink-0 items-center justify-center rounded-full border bg-gray-50 px-3 py-1 text-sm text-gray-500 hover:border-blue-400"
                    >
                        전체
                    </button>
                </div>
                <div className="flex flex-row gap-2">
                    <button
                        onClick={handleDownload}
                        className="flex flex-shrink-0 items-center gap-1 rounded-md bg-blue-400 px-4 py-2 text-sm font-medium text-white"
                    >
                        Excel
                        <DownLoadIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <ExelTable
                data={excelsData}
                isPending={isExcelsPending}
                handleSelect={handleSelect}
                handleToggleSelectAll={handleToggleSelectAll}
                selectedIds={selectedIds}
            />
        </div>
    );
}

export default ExcelListPage;
