import { FiTrash2, FiTable } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { CiImport } from "react-icons/ci";

type IconName = "add" | "delete" | "import" | "stats";
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
  }
}

export default Icon;
