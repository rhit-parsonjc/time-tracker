import { FiTrash2, FiTable } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { CiImport, CiExport } from "react-icons/ci";
import { MdEdit } from "react-icons/md";

export type IconName =
  | "add"
  | "delete"
  | "import"
  | "stats"
  | "export"
  | "edit";
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
      return <CiImport />;
    case "stats":
      return <FiTable />;
    case "export":
      return <CiExport />;
    case "edit":
      return <MdEdit />;
  }
}

export default Icon;
