const publish = (producer) => {
  return async (req, res) => {
    try {
      const { body } = req;
      const result = await producer.send({
        topic: 'test-topic',
        messages: [
          { value: JSON.stringify({ name: body.name, content: body.content }) }
        ]
      });
      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
};

module.exports = { publish };
