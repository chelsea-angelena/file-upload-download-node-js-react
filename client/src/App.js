import React from 'react';
import FileUpload from './FileUpload';

export default function App() {
	return (
		<div className='app'>
			<div id='overlay'>
				<FileUpload />
			</div>
		</div>
	);
}
