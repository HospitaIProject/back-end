import DesktopPagination from './DesktopPagination';
import MobilePagination from './MobilePagination';

function ResponsivePagination({ pageSize = 1 }: { pageSize?: number }) {
    return (
        <>
            <div className="mt-auto flex w-full flex-row mobile:hidden">
                <MobilePagination pageSize={pageSize} />
            </div>
            <div className="mt-auto hidden w-full flex-row mobile:flex">
                {/* <DesktopPagination pageSize={pageSize} /> */}
                <MobilePagination pageSize={pageSize} />
            </div>
        </>
    );
}

export default ResponsivePagination;
