const User = sequelize.define(
  'User',
  { firstName: Sequelize.STRING },
  { timestamps: false }
);

const Task = sequelize.define(
  'Task',
  { taskName: Sequelize.STRING },
  { timestamps: false }
);
