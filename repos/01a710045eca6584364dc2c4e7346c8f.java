import java.util.Scanner;

/*
 * The user inputs a line of text.
 * It is converted to lowercase and the frequency of each letter is counted.
 * Any characters not a through z are ignored.
 * The frequencies are printed out.
 */
public class CharacterCounter {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        String line = input.nextLine(); // get the line of text from the user
        line = line.toLowerCase();
        
        int[] frequencies = new int[26]; // amount of 'a' is stored at 0, amount of 'b' at 1, etc.
        for(char c : line.toCharArray()) { // iterate through each character in the line
            if(c >= 'a' && c <= 'z') { // only include a through z
                frequencies[c - 'a']++;
            }
        }
        
        // now we print out the frequencies
        for(int i=0; i<frequencies.length; i++) {
            System.out.println((char) (i + 'a') + ": " + frequencies[i]); // prints out "character: frequency"
        }
    }
}
