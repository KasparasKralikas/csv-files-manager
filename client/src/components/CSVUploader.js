import React from 'react';
import { CSVReader } from 'react-papaparse';
import Button from '@material-ui/core/Button';

function CSVUploader({ setData }) {

    const buttonRef = React.createRef();

    const handleOpenDialog = (e) => {
        if (buttonRef.current) {
            buttonRef.current.open(e);
        }
    };

    const handleOnFileChange = (data) => {
        setData(data);
        console.log(data);
    };

    const handleOnError = (err, _file, _inputElem, _reason) => {
        console.log(err);
    };

    const handleOnRemoveFile = (data) => {
        setData(data);
        console.log(data);
    };

    const handleRemoveFile = (e) => {
        if (buttonRef.current) {
            buttonRef.current.removeFile(e);
        }
    };

    return (
        <CSVReader
            ref={buttonRef}
            onFileLoad={handleOnFileChange}
            onError={handleOnError}
            noClick
            noDrag
            onRemoveFile={handleOnFileChange}
        >
            {({ file }) => (
                <aside
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: 10,
                    }}
                >
                    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                        Browse files
                    </Button>
                    <div>
                        {file && file.name}
                    </div>
                    <Button variant="contained" color="secondary" onClick={handleRemoveFile}>
                        Remove
                    </Button>
                </aside>
            )}
        </CSVReader>
    );
}

export default CSVUploader;