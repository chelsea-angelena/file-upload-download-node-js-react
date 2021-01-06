import React, { useState } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import styled from 'styled-components';

export default function EditProfile() {
	const [loaded, setLoaded] = useState(0);
	const [selectedFiles, setSelectedFiles] = useState(null);
	const [singleFile, setSingleFile] = useState(null);

	const checkMime = (e) => {
		let files = e.target.files;
		let err = '';
		const types = ['image/png', 'image/jpg', 'image/gif'];
		for (let x = 0; x < files.length; x++) {
			if (types.every((type) => files[x].type !== type)) {
				err += files[x].type + 'is not supported format';
			}
		}
		if (err !== '') {
			e.target.value = null;
			console.log(err);
			return false;
		}
		return true;
	};

	const maxFilesSelected = (event) => {
		let files = event.target.files;
		if (files.length > 3) {
			const msg = 'only 3 files at a time';
			event.target.value = null;
			console.log(msg);
			return false;
		}
		return true;
	};

	// const checkFileSize = (e) => {
	// 	let files = e.target.files;
	// 	let size = 15000000;
	// 	let err = '';
	// 	for (let x = 0; x < files.length; x++) {
	// 		if (files[x].size > size) {
	// 			err += files[x].type + 'is too large. Please picka smaller file';
	// 		}
	// 	}
	// 	if (err !== '') {
	// 		e.target.value = null;
	// 		console.log(err);
	// 		return false;
	// 	}
	// 	return true;
	// };
	const onFileChange = (e) => {
		let files = e.target.files;
		if (
			maxFilesSelected(e)
			//  && checkMime(e)
		) {
			setSelectedFiles(files);
		}
	};
	const handleClick = (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append('file', singleFile);
		axios.post('/api/images', data).then((res) => {
			console.log(data);
			console.log(res.statusText);
		});
	};

	const handleMultiClick = () => {
		const data = new FormData();
		for (let x = 0; x < selectedFiles.length; x++) {
			data.append('file', selectedFiles[x]);
		}
		axios.post('/api/images', data, {
			onUploadProgress: (ProgressEvent) => {
				setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
			},
		});
	};
	return (
		<Layout>
			<>
				<Title>Image and File Uploader</Title>
				<form onSubmit={handleClick}>
					<input
						type='file'
						onChange={(e) => setSingleFile(e.target.files[0])}
					/>
					<button type='submit'>Submit</button>
				</form>
				<div>
					<Progress max='100' color='success' value={loaded}>
						{Math.round(loaded, 2)}%
					</Progress>
				</div>
				<p>Multiple form</p>
				<form onSubmit={handleMultiClick}>
					<input type='file' multiple onChange={onFileChange} />
					<button type='submit'>Submit</button>
				</form>
			</>
		</Layout>
	);
}

const Layout = styled.div`
	margin: 0 auto;
	padding: 24px;
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: no-wrap;
	align-items: center;
	align-self: center;
	justify-content: center;
	font-family: 'space mono';
`;
const Title = styled.h1`
	font-family: 'space mono';
	font-size: 2rem;
`;
