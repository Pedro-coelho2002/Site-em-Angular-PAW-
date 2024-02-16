// Importe o modelo do Evento e do Local
const Event = require("../models/Event");
const Local = require("../models/Local");

// Defina a função do controller
exports.getEventsByLocal = function (req, res) {
  // Obtenha o ID do local a partir dos parâmetros da solicitação
  const localId = req.params.localId;

  // Encontre o local correspondente ao ID fornecido
  Local.findById(localId, function (err, local) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erro ao obter local", error: err.message });
    }

    if (!local) {
      return res.status(404).json({ message: "Local não encontrado" });
    }

    // Encontre todos os eventos relacionados ao local pelo ID do local
    Event.find({ local_id: localId }, function (err, events) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erro ao obter eventos", error: err.message });
      }
      res.json(events);
    });
  });
};
