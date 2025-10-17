import java.security.SecureRandom;
import java.util.Scanner;

public class PasswordGenerator {
    private static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String DIGITS = "0123456789";
    private static final String SYMBOLS = "!@#$%&*()-_=+[]{};:,.<>?";
    private static final String ALL_CHARS = UPPER + LOWER + DIGITS + SYMBOLS;
    private static SecureRandom random = new SecureRandom();

    public static String generatePassword(int length) {
        if (length < 4) {
            throw new IllegalArgumentException("La longitud debe ser al menos 4 para incluir todos los tipos de caracteres.");
        }

        StringBuilder password = new StringBuilder(length);

        password.append(randomChar(UPPER));
        password.append(randomChar(LOWER));
        password.append(randomChar(DIGITS));
        password.append(randomChar(SYMBOLS));

        for (int i = 4; i < length; i++) {
            password.append(randomChar(ALL_CHARS));
        }

        return shuffleString(password.toString());
    }

    private static char randomChar(String chars) {
        int index = random.nextInt(chars.length());
        return chars.charAt(index);
    }

    private static String shuffleString(String input) {
        char[] a = input.toCharArray();
        for (int i = a.length - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            char tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return new String(a);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Introduce la longitud deseada para la contraseña (mínimo 4): ");

        int length = scanner.nextInt();

        try {
            String password = generatePassword(length);
            System.out.println("Contraseña generada: " + password);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }

        scanner.close();
    }
}
