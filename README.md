const t = await sequelize.transaction();
    try {
      await ChallengedTodo.create(
        {
          userId: userId,
          challengedTodo: todoId,
        },
        { transaction: t }
      );

      const challengedTodo = await ChallengedTodo.findAll({
        where: { challengedTodo: todoId },
        transaction: t,
      });
      const challengCount = challengedTodo.length;

      await Todo.update(
        { challengedCounts: challengCount },
        { where: { todoId: todoId }, transaction: t }
      );
      await t.commit();
    } catch (err) {
      await t.rollback();
    }