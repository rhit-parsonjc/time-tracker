import { FiTrash2, FiTable } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { CiImport, CiExport } from "react-icons/ci";

type IconName = "add" | "delete" | "import" | "stats" | "export";
type Props = {
  iconName: IconName;
};

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
  }
}

export default Icon;
