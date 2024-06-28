import ArrowIcon from '../icons/ArrowIcon';
// import { useSearchParams } from 'react-router-dom';
import ResponsivePagination from '../components/common/ResponsivePagination';

const FAKE_USER_DATA = [
    {
        id: 1,
        name: 'First name',
        description: 'First Description',
    },
    {
        id: 2,
        name: 'Second name',
        description: 'Second Description',
    },
    {
        id: 3,
        name: 'Third name',
        description: 'Third Description',
    },
    {
        id: 4,
        name: 'Fourth name',
        description: 'Fourth Description',
    },
    {
        id: 5,
        name: 'Fifth Title',
        description: 'Fifth Description',
    },
];

function MainPage() {
    // const [searchParams] = useSearchParams();
    // const page = Number(searchParams.get('page')) || 1;

    return (
        <div className="flex flex-col justify-center w-full gap-6 p-7">
            <div className="grid grid-cols-1 gap-4 mt-4">
                {FAKE_USER_DATA.map((data) => (
                    <div className="flex flex-row items-center justify-between w-full p-4 bg-white shadow-md cursor-pointer hover:bg-gray-50">
                        <div key={data.id}>
                            <h2 className="text-xl font-semibold">{data.name}</h2>
                            <p className="mt-2">{data.description}</p>
                        </div>
                        <ArrowIcon className="w-5 h-5" />
                    </div>
                ))}
            </div>
            <ResponsivePagination />
        </div>
    );
}

export default MainPage;
