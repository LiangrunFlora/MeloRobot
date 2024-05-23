import SearchList from "@/pages/search/components/SearchList.tsx";
import SummaryCard from "@/pages/search/components/SummaryCard.tsx";

const Search = () => {
  return (
    <>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <SummaryCard />
          <SearchList />
        </div>
    </>
  )
}

export default Search