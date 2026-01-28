import fs from 'fs/promises';

const audioFilter = (file) => file.match(/\.(?:mp3|flac)$/i);

const reader = async () => {
	// get the listing of files in the folder
	const rawFiles = await fs.readdir('./server/music');
	// filter for supported audio files
	const files = rawFiles.filter(audioFilter);
	// if files were found return them
	if (files.length > 0) {
		return files;
	}

	// fall back to the default folder
	const defaultFiles = await fs.readdir('./server/music/default');
	return defaultFiles.map((file) => `default/${file}`).filter(audioFilter);
};

export default reader;
