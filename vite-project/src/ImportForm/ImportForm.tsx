import { useState } from "react";
import { TimeEntry } from "../data/TimeEntry";
import { importTimeEntries } from "../data/ImportExport";
import ErrorMessage from "../ErrorMessage/ErrorMesage";
import styles from "./ImportForm.module.css";

type Props = {
  modifyTimeEntries: (timeEntries: TimeEntry[]) => void;
};

function ImportExportForm(props: Props) {
  const { modifyTimeEntries } = props;
  const [timeEntryErrorMsg, setTimeEntryErrorMsg] = useState<string>("");

  function handleFileImport(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList: FileList | null = e.target.files;
    if (fileList) {
      importTimeEntries(
        fileList[0],
        (timeEntries) => {
          modifyTimeEntries(timeEntries);
          setTimeEntryErrorMsg("");
        },
        (errorMsg) => setTimeEntryErrorMsg(errorMsg)
      );
    } else {
      setTimeEntryErrorMsg("No files to read from");
    }
  }

  return (
    <div>
      <input
        className={styles.importButton}
        type="file"
        onChange={handleFileImport}
      />
      <ErrorMessage message={timeEntryErrorMsg} />
    </div>
  );
}

export default ImportExportForm;
