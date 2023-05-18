const file_upload = () => {
  return (
    <div>
      <form method="POST" action="/api/upload" encType="multipart/form-data">
        <input type="file" name="file" id="file" multiple={true} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default file_upload;
