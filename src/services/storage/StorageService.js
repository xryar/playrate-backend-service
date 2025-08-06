/* eslint-disable no-unused-vars */
const supabase = require('../../utils/supabaseClient');

class StorageService {
  constructor(bucketName = process.env.BUCKET_NAME) {
    this._bucket = bucketName;
  }

  async writeFile(file, meta) {
    const filename = `${Date.now()}-${meta.filename}`;
    const buffer = file._data;

    const { error } = await supabase.storage
      .from(this._bucket)
      .upload(`uploads/${filename}`, buffer, {
        contentType: meta.headers['content-type'],
      });

    if (error) {
      throw new Error(`Gagal upload ke Supabase: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from(this._bucket)
      .getPublicUrl(`uploads/${filename}`);

    return `uploads/${filename}`;
  }

  getPublicUrl(path) {
    const { data } = supabase.storage
      .from(this._bucket)
      .getPublicUrl(path);
    return data.publicUrl;
  }
}

module.exports = StorageService;