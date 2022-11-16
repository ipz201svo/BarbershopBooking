import {useMemo} from "react";
import {useSearchParams} from "react-router-dom";

const usePaginationParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return useMemo(() => {
    const page = Number(searchParams.get('page')) || 1;
    const size = Number(searchParams.get('size')) || 10;

    return {
      page,
      size,
      setPage: (page: number) => setSearchParams(prev => {
        prev.set('page', page.toString());
        return new URLSearchParams(prev);
      }),
      setSize: (size: number) => setSearchParams(prev => {
        prev.set('size', size.toString());
        return new URLSearchParams(prev);
      }),
    };
  }, [searchParams, setSearchParams]);
};

export default usePaginationParams;
