const { Todo, Comment, sequelize } = require("../../models");

const CommentService = require("../../services/comment.service");
const commentService = new CommentService();

Todo.findOne = jest.fn();
sequelize.transaction = jest.fn();
sequelize.query = jest.fn();
Comment.findOne = jest.fn();

describe("댓글 작성 API 테스트", () => {
  const userId = 1;
  const todoId = 2;
  const comment = "댓글";

  it("댓글의 todo 정보가 존재하면 true를 반환한다", async () => {
    expect(async () => {
      Todo.findOne.mockReturnValue(
        Promise.resolve({
          todoId: 1,
          mbti: "ENFP",
          date: "2022-09-27",
          todo: "투두 내용",
          commentCounts: 1,
          challengedCounts: 2,
          createAt: "2022-09-27 13:16:12",
          updatedAt: "2022-09-27 13:16:12",
          userId: 1,
        })
      );
      await commentService.createComment(userId, todoId, comment);
    }).toBeTruthy();
  });

  it("댓글의 todo 정보가 없으면 에러를 반환한다", async () => {
    expect(async () => {
      Todo.findOne.mockReturnValue();
      await commentService.createComment(userId, todoId, comment);
    }).rejects.toThrowError(
      new Error("존재하지 않거나 이미 삭제된 todo입니다.")
    );
  });

  it("댓글의 todo 정보가 있으면 transaction이 실행된다", async () => {
    await Todo.findOne.mockReturnValue(
      Promise.resolve({
        todoId: 1,
        mbti: "ENFP",
        date: "2022-09-27",
        todo: "투두 내용",
        commentCounts: 1,
        challengedCounts: 2,
        createAt: "2022-09-27 13:16:12",
        updatedAt: "2022-09-27 13:16:12",
        userId: 1,
      })
    );
    await commentService.createComment(userId, todoId, comment);
    expect(sequelize.transaction).toBeCalled();
  });
});

describe("댓글 삭제 API 테스트", () => {
  const userId = 1;
  const commentId = 2;

  it("댓글 정보가 존재하면 true를 반환한다", async () => {
    expect(async () => {
      Comment.findOne.mockReturnValue(
        Promise.resolve({
          commentId: 1,
          comment: "댓글 내용",
          createAt: "2022-09-27 13:16:12",
          updatedAt: "2022-09-27 13:16:12",
          todoId: 1,
          userId: 1,
        })
      );
      await commentService.deleteComment(userId, commentId);
    }).toBeTruthy();
  });

  it("댓글 정보가 없으면 에러를 반환한다", async () => {
    expect(async () => {
      Comment.findOne.mockReturnValue();
      await commentService.deleteComment(userId, commentId);
    }).rejects.toThrowError(new Error("댓글이 존재하지 않습니다."));
  });

  it("본인 댓글이 아니면 에러를 반환한다", async () => {
    expect(async () => {
      Comment.findOne.mockReturnValue(
        Promise.resolve({
          commentId: 1,
          comment: "댓글 내용",
          createAt: "2022-09-27 13:16:12",
          updatedAt: "2022-09-27 13:16:12",
          todoId: 1,
          userId: 2,
        })
      );
      await commentService.deleteComment(userId, commentId);
    }).rejects.toThrowError(new Error("본인 댓글만 삭제 가능합니다."));
  });

  it("댓글 정보가 있고 본인 댓글이 맞으면 transaction이 실행된다", async () => {
    await Comment.findOne.mockReturnValue(
      Promise.resolve({
        commentId: 1,
        comment: "댓글 내용",
        createAt: "2022-09-27 13:16:12",
        updatedAt: "2022-09-27 13:16:12",
        todoId: 1,
        userId: 1,
      })
    );
    await commentService.deleteComment(userId, commentId);

    expect(sequelize.transaction).toBeCalled();
  });
});
