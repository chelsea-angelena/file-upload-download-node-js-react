import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import styled from 'styled-components';

export default function EditProfile() {
	const [loaded, setLoaded] = useState(0);
	const [loadedMulti, setLoadedMulti] = useState(0);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [singleFile, setSingleFile] = useState(null);

	const imageRef = useRef();
	const multiRef = useRef();
	// const checkMime = (e) => {
	// 	let files = e.target.files;
	// 	let err = '';
	// 	const types = ['image/png', 'image/jpg', 'image/gif'];
	// 	for (let x = 0; x < files.length; x++) {
	// 		if (types.every((type) => files[x].type !== type)) {
	// 			err += files[x].type + 'is not supported Format';
	// 		}
	// 	}
	// 	if (err !== '') {
	// 		e.target.value = null;
	// 		console.log(err);
	// 		return false;
	// 	}
	// 	return true;
	// };

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
		axios
			.post('/api/images', data, {
				onUploadProgress: (ProgressEvent) => {
					setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
				},
			})
			.then((res) => {
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
				setLoadedMulti((ProgressEvent.loadedMulti / ProgressEvent.total) * 100);
			},
		});
	};
	return (
		<Layout>
			<>
				<Title>Image and File Uploader</Title>

				<Form onSubmit={handleClick}>
					<h3>Single File Upload</h3>
					{singleFile && (
						<img
							src={URL.createObjectURL(singleFile)}
							alt='preview'
							width='200px'
						/>
					)}
					<input
						ref={imageRef}
						type='file'
						onChange={(e) => setSingleFile(e.target.files[0])}
					/>
					<Bar>
						<H6>Progress...</H6>
						<Progress
							max='100'
							color='magenta'
							style={{ width: '300' }}
							value={loaded}
						>
							{Math.round(loaded, 2)}%
						</Progress>
					</Bar>
					<button type='submit'>Submit</button>
				</Form>

				<Form onSubmit={handleMultiClick}>
					<h3>Multiple File Upload</h3>
					{/* {selectedFiles
						? selectedFiles.map((imgfile) => <ImgPreview imgfile={imgfile} />)
						: null} */}

					<input ref={multiRef} type='file' multiple onChange={onFileChange} />
					<Bar>
						<H6>Progress...</H6>
						<Progress
							max='100'
							color='magenta'
							style={{ width: '300' }}
							value={loadedMulti}
						>
							{Math.round(loaded, 2)}%
						</Progress>
					</Bar>
					<button type='submit'>Submit</button>
				</Form>
			</>
		</Layout>
	);
}

// const ImgPreview = ({ imgfile }) => {
// 	console.log(imgfile);
// 	return (
// 		<div>
// 			<img src={URL.createObjectURL(imgfile)} alt='preview' width='200px' />
// 		</div>
// 	);
// };

const Layout = styled.div`
	width: 100%;
	font-family: 'space mono';
	color: white;
	display: flex;
	flex-direction: column;
`;
const Title = styled.h1`
	font-family: 'space mono';
	font-size: 3rem;
	color: white;
	align-self: center;
`;
const Form = styled.form`
	display: flex;
	flex-direction: column;
	max-width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: no-wrap;
	align-items: center;
	align-self: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.9);
	margin-top: 24px;
`;
const Bar = styled.div`
	width: 100%;
	padding: 32px;
	align-items: center;
	justify-content: center;
`;
const H6 = styled.h6`
	font-size: 1rem;
`;
