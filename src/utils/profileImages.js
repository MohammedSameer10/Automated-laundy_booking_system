// Random profile images - using placeholder service for variety
// These can be replaced with actual football player images
export const profileImages = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=7',
  'https://i.pravatar.cc/150?img=9',
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=13',
  'https://i.pravatar.cc/150?img=15',
  'https://i.pravatar.cc/150?img=17',
  'https://i.pravatar.cc/150?img=19',
]

export const getRandomProfileImage = () => {
  return profileImages[Math.floor(Math.random() * profileImages.length)]
}

