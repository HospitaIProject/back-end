import DesktopPagination from './DesktopPagination';
import MobilePagination from './MobilePagination';

function ResponsivePagination() {
    return (
        <>
            <div className="mobile:hidden">
                <MobilePagination />
            </div>
            <div className="hidden w-full mobile:flex">
                <DesktopPagination />
            </div>
        </>
    );
}

export default ResponsivePagination;
