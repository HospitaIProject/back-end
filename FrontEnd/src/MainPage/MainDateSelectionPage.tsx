import { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import { useMainDateQuery } from './_lib/mainDateService';
import { Link } from 'react-router-dom';
import ArrowIcon from '../icons/ArrowIcon';

function MainDateSelectionPage() {
    const [selectedYear, setSelectedYear] = useState<string | undefined>(undefined);

    const mainDateQuery = useMainDateQuery();
    const { data, isPending, error } = mainDateQuery;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(e.target.value);
    };

    useEffect(() => {
        if (data) {
            console.log('환자 년월 목록', data);
            setSelectedYear(Object.keys(data)[0]);
        }
    }, [data]);

    if (isPending) {
        return <Loading text="로딩중.." />;
    }
    if (error) {
        return <div>에러 발생</div>;
    }

    return (
        <div className="mt-2 flex flex-1 flex-col">
            <div className="flex w-full justify-center bg-white p-3 text-gray-600">
                {/* <span>월별 선택</span> */}
                <div className="relative">
                    <label htmlFor="year-select" className="absolute -top-[0.6px] right-5 font-semibold">
                        년
                    </label>
                    <select
                        id="year-select"
                        onChange={handleChange}
                        value={selectedYear}
                        className="flex items-center gap-1 pl-2 pr-5 text-lg font-semibold"
                    >
                        {/* 2024 <ArrowIcon className="w-6 h-6 rotate-90" /> */}

                        {Object.keys(data).map((year, index) => (
                            <option defaultValue={index === 0 ? year : undefined} key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-2 flex-1 bg-white">
                <div className="grid grid-cols-3 gap-3 p-3 mobile:grid-cols-4">
                    {selectedYear &&
                        data[selectedYear].map((month) => (
                            <Link
                                to={`/patient?year=${selectedYear}&month=${month}`}
                                key={month}
                                className="relative flex flex-col items-center justify-center gap-1 rounded-md bg-blue-100 px-2 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1"
                            >
                                <span className="font-medium">{month}월</span>
                                <span className="text-sm text-gray-600">수술 건: 0</span>
                                <ArrowIcon className="absolute right-0 top-0 h-4 w-4 -rotate-45 text-blue-500" />
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default MainDateSelectionPage;
