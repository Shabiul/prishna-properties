import bcrypt from 'bcryptjs';

const password = 'NaazAiLabs@786345';
const saltRounds = 12; // High number for strong security

try {
  const hash = await bcrypt.hash(password, saltRounds);
  console.log('Password hash:');
  console.log(hash);
  console.log('\nNow update the migration file with this hash!');
} catch (err) {
  console.error('Error generating hash:', err);
  process.exit(1);
}
