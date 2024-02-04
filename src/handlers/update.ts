import prisma from "../db";

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  console.log(req.user.id);

  if (!products || products.length === 0) {
    res.status(404);
    res.json({ error: "Product not found" });
    return;
  }

  const updates = products.reduce((acc, product) => {
    return [...acc, ...product.updates];
  }, [] as any[]);

  res.json({ data: updates });
};

export const getOneUpdate = async (req, res) => {
  const { id } = req.params;

  const update = await prisma.update.findUnique({
    where: {
      id: id,
    },
  });

  res.json({ data: update });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    res.status(404);
    res.json({ error: "Product not found" });
    return;
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      productId: req.body.productId,
    },
  });

  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.flatMap((product) => product.updates);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    res.status(404);
    res.json({ error: "Update not found" });
    return;
  }

  const updated = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updated });
};

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.flatMap((product) => product.updates);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    res.status(404);
    res.json({ error: "Update not found" });
    return;
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleted });
};
