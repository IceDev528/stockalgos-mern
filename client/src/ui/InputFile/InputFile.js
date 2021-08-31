import React, { Component } from 'react';
import './InputFile.scss';
import FileUploadIcon from '../../icons/FileUploadIcon';
import CloudUploadIcon from '../../icons/CloudUploadIcon';
import FileIcon from '../../icons/FileIcon';

class InputFile extends Component {
    state = {
        src: this.props.src,
        isImage: this.props.accept && this.props.accept.includes('image'),
        className: '',
        fileName: null,
    }
    onChange = e => {
        const { files } = e.target;
        const { isImage } = this.state;
        if (files.length > 0) {
            isImage ? this.setState({ src: URL.createObjectURL(files[0]), className: '__image-is-added' }) : this.setState({ className: '__file-is-added', fileName: files[0].name })
        }
        this.props.onChange && this.props.onChange(e);
    }
    render() {
        const { src, isImage, className, fileName } = this.state;
        return (
            <label className={`__input-file __pointer __dark-grey-text __block ${className} ${this.props.className} ${isImage ? '__image' : ''}`}>
                <input type='file' {...this.props} className='__input-field-small' onChange={this.onChange} />
                <div className='__shown-message __center' style={{ backgroundImage: `url(${src})` }}>
                    {isImage ? <CloudUploadIcon /> : className === '__file-is-added' ? <FileIcon /> : <FileUploadIcon />}
                    {fileName ? <div className='__bold'> {fileName} </div> :
                        <div className='__small'>
                            Drag an {isImage ? "image" : 'file'} here <br /> or <span className='__green-text'>browse</span> to upload
                        </div> 
                    }
                </div>
                <div className='__green-text __on-file-added-message __mt-sm __small'>Upload a different {isImage ? 'image' : 'source file'}</div>
                <div className='__alert'>Please upload the {isImage ? 'image' : 'source file'}</div>
            </label>
        )
    }
}

export default InputFile;