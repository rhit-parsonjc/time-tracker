import { FiTrash2, FiTable, FiUpload, FiDownload } from "react-icons/fi";
import { IoAdd, IoList } from "react-icons/io5";
import { MdEdit, MdFilterAlt } from "react-icons/md";

export type IconName =
  | "add"
  | "delete"
  | "import"
  | "stats"
  | "export"
  | "edit"
  | "categories"
  | "filter";
interface Props {
  iconName: IconName;
}

function Icon(props: Props) {
  const { iconName } = props;
  switch (iconName) {
    case "add":
      return <IoAdd />;
    case "delete":
      return <FiTrash2 />;
    case "import":
      return <FiUpload />;
    case "stats":
      return <FiTable />;
    case "export":
      return <FiDownload />;
    case "edit":
      return <MdEdit />;
    case "categories":
      return <IoList />;
    case "filter":
      return <MdFilterAlt />;
  }
}

export default Icon;
