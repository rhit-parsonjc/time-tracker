import { useState } from "react";
import { TimeEntry } from "../../data/TimeEntry";
import { importTimeEntries } from "../../data/ImportExport";
import ErrorMessage from "../ErrorMessage/ErrorMesage";
import styles from "./ImportForm.module.css";

interface Props {
  modifyTimeEntries: (timeEntries: TimeEntry[]) => void;
  modifyCategories: (categories: string[]) => void;
}

function ImportExportForm(props: Props) {
  const { modifyTimeEntries, modifyCategories } = props;
  const [timeEntryErrorMsg, setTimeEntryErrorMsg] = useState<string>("");

  function handleFileImport(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList: FileList | null = e.target.files;
    if (fileList) {
      importTimeEntries(
        fileList[0],
        (timeEntries, categories) => {
          modifyTimeEntries(timeEntries);
          modifyCategories(categories);
          setTimeEntryErrorMsg("");
        },
        (errorMsg) => setTimeEntryErrorMsg(errorMsg)
      );
    } else {
      setTimeEntryErrorMsg("No files to read from");
    }
  }

  return (
    <div id={styles.importForm}>
      <input
        type="file"
        onChange={handleFileImport}
        id={styles.fileImportForm}
      />
      <ErrorMessage message={timeEntryErrorMsg} />
    </div>
  );
}

export default ImportExportForm;
