import ArrowIcon from '../../icons/ArrowIcon';
import ReactPaginate from 'react-paginate';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function MobilePagination() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();

    const handleRouter = ({ selected }: { selected: number }) => {
        const page = selected + 1;
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            params.delete('page');
        } else {
            params.set('page', page.toString());
        }
        navigate(pathname + '?' + params.toString(), { replace: true });
    };

    const forcePage = Number(searchParams.get('page')) ? Number(searchParams.get('page')) - 1 : 0;

    const goToPreviousPage = () => {
        if (forcePage === 0) return;
        handleRouter({ selected: forcePage - 1 });
    };
    const goToNextPage = () => {
        if (forcePage === 19) return;
        handleRouter({ selected: forcePage + 1 });
    };

    return (
        <div className="flex flex-col w-full gap-5">
            <div className="flex justify-between w-full">
                <button
                    onClick={goToPreviousPage}
                    disabled={forcePage === 0}
                    className={`mr-2 flex h-8 w-14 items-center justify-center p-1 ${forcePage === 0 ? 'cursor-not-allowed opacity-40' : ''}`}
                >
                    <ArrowIcon className="w-8 h-8 transform rotate-180" />
                </button>
                <button
                    onClick={goToNextPage}
                    disabled={forcePage === 19}
                    className={`ml-2 flex h-8 w-14 items-center justify-center p-1 ${forcePage === 19 ? 'cursor-not-allowed opacity-40' : ''}`}
                >
                    <ArrowIcon className="w-8 h-8" />
                </button>
            </div>
            <ReactPaginate
                previousLabel={null}
                nextLabel={null}
                breakLabel={
                    <div className="flex items-center justify-center border h-9 w-9">
                        <span>..</span>
                    </div>
                }
                pageCount={20}
                onPageChange={handleRouter}
                containerClassName={'flex flex-row gap-1 mx-auto items-center '}
                pageLinkClassName={
                    'flex items-center justify-center w-9 h-9 text-sm border  border-neutral-300 hover:border-neutral-500'
                }
                activeLinkClassName="bg-gray-500 text-white"
                pageRangeDisplayed={2} //선택된 페이지 주변에 보여질 페이지 수
                marginPagesDisplayed={1} //첫 페이지와 마지막 페이지 주변에 보여질 페이지 수
                forcePage={forcePage} //선택된 페이지
            />
        </div>
    );
}

export default MobilePagination;
