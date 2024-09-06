import { useState } from "react";
import { TimeEntry } from "../data/TimeEntry";
import { importTimeEntries, writeTimeEntries } from "../data/ImportExport";
import ErrorMessage from "../ErrorMessage/ErrorMesage";

type Props = {
  timeEntries: TimeEntry[];
  modifyTimeEntries: (timeEntries: TimeEntry[]) => void;
};

function ImportExportForm(props: Props) {
  const { timeEntries, modifyTimeEntries } = props;
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
      <input type="file" onChange={handleFileImport} />
      <button onClick={() => writeTimeEntries(timeEntries)}>Export</button>
      <ErrorMessage message={timeEntryErrorMsg} />
    </div>
  );
}

export default ImportExportForm;
