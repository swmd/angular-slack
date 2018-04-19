import Message from '../models/message';

const configureChannels = (socket, user) => {
  socket.on('disconnect', () => {
    console.log(`[INFO] User ${user._id} disconnected!`);
    socket.broadcast.emit('userDisconnect', { user: user._id });
  });

  socket.on('send', (data) => {
    const msg = new Message({
      user: user._id,
      username: user.username,
      time: new Date().getTime(),
      text: data.text,
      group: data.groupId
    });
    msg.save();

    const msgData = {
      msg: {
        ...msg.toObject(),
        username: user.username,
      },
    };

    socket.emit('receive', msgData);
    socket.broadcast.emit('receive', msgData);
  });

  console.log(`[INFO] User ${user._id} connected`);
};

export default configureChannels;
