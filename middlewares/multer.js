const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const { logger } = require("../utils/logger");

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});
const s3 = new AWS.S3();

const uploadProfile = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET,
    key(req, file, cb) {
      // cb === callback
      const fileName = Math.floor(Math.random() * 100000000).toString();
      const extension = file.mimetype.split("/")[1];
      if (!["png", "jpg", "jpeg", "JPG", "JPEG"].includes(extension)) {
        return cb(
          new Error("png, jpg, jpeg 확장자명의 파일만 업로드 가능합니다")
        );
      }
      cb(null, `mimic/${Date.now()}-${fileName}.${extension}`);
    },
  }),
  // 10mb로 제한
  limits: { fileSize: 10 * 5000 * 5000 },
});

const deleteProfile = async (url) => {
  const filename = url.split("/")[4];

  await s3.deleteObject(
    {
      Bucket: process.env.S3_BUCKET_FOLDER,
      Key: filename,
    },
    function (err, data) {
      if (err)
        logger.error(
          "[S3 profile 삭제 오류(/mimic)]" + err.name + " - " + err.message
        );
    }
  );
  await s3.deleteObject(
    {
      Bucket: process.env.S3_BUCKET_FOLDER2,
      Key: filename,
    },
    function (err, data) {
      if (err)
        logger.error(
          "[S3 profile 삭제 오류(/resizingMimic)]" +
            err.name +
            " - " +
            err.message
        );
    }
  );
};

module.exports = { uploadProfile, deleteProfile };
