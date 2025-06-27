import { Search } from "lucide-react"
import { useState, type FC, type FormEvent, type JSX } from "react"
import useConverstation from "../../store/useConverstaion";
import { useGetConversations } from "../../hooks/useGetConverstations";
import toast from "react-hot-toast";

const SearchInput: FC = (): JSX.Element => {
  const [search, setSearch] = useState("");

  const { setSelectedConversation } = useConverstation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be ar least 3 characters long");
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("")
    } else {
      toast.error("No such user found!")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <Search size={18} />
      </button>
    </form>
  )
}

export default SearchInput