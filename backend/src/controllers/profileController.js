const prisma = require('../utils/prisma');

exports.getMyProfile = async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.userId }
    });
    res.json(profile);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

exports.createProfile = async (req, res) => {
  const userId = req.userId;
  const { name, bio, headline, photoUrl, interests } = req.body;

  try {
    const existing = await prisma.profile.findUnique({ where: { userId } });
    if (existing) return res.status(400).json({ message: 'Profile already exists' });

    const profile = await prisma.profile.create({
      data: {
        name,
        bio,
        headline,
        photoUrl,
        interests,
        user: { connect: { id: userId } },
      },
    });

    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create profile' });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.userId;
  const { name, bio, headline, photoUrl, interests } = req.body;

  try {
    const updated = await prisma.profile.update({
      where: { userId },
      data: { name, bio, headline, photoUrl, interests },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    await prisma.profile.delete({ where: { userId: req.userId } });
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete profile' });
  }
};

exports.publicFeed = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  try {
    const profiles = await prisma.profile.findMany({
      where: { userId: { not: req.userId } },
      skip,
      take: Number(limit),
      orderBy: { id: 'desc' }
    });

    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load public feed' });
  }
};
