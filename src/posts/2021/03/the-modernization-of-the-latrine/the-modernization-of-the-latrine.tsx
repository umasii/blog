import { Post } from '../../../Post';
import originalImg from './original.jpg';
import newLayoutImg from './3rd.png';

export class TheModernizationOfTheLatrine extends Post {
  public name = 'The Modernization of the Latrine';
  public image = undefined;
  public author = 'luke';
  public slug = 'the-modernization-of-the-latrine';
  public date = new Date('31 Mar 2021');
  public hidden = false;
  public excerpt = 'It\'s no question that bathrooms are a necessity for a business to accommodate their customers. However, a question stands- how much do these bathrooms really accommodate people?';
  public keywords = ['Unisex', 'Latrine'];

  public render() {
    return (
      <article>
        <p>Steps to Create a more Efficient Unisex Bathroom</p>
        <p>It's no question that bathrooms are a necessity for a business to accommodate their customers. However, a question stands- how much do these bathrooms really accommodate people? As it turns out, not much. Most of the design choices made for bathrooms are made with full aim on efficiency. Bathrooms divided by gender are parallel to each other so that the toilets are successional and uninterrupted. This allows for the toilets to share plumbing which is an absolute necessity for disposing waste quickly and efficiently. Current bathroom layouts also tend to not accommodate the LGBT community.</p>
        <img src={originalImg.src} alt="Current bathroom layout" />
        <p>Businesses like Disneyland or high-volume malls require that bathrooms accommodate many people at once, and as a result are more difficult to improve. At the end of the day, businesses are willing to compromise unisex accommodations for efficiency. However, there are ways to make a functional restroom that is unisex.</p>
        <img src={newLayoutImg.src} alt="Newly proposed bathroom layout" />
        <h2>Relocating the Sink</h2>
        <p>The most straightforward way of understanding how to streamline the bathroom is to break down what exactly the purpose of a bathroom is. Bathrooms are made so that people can relieve themselves in a private area, and therefore that is the largest priority. Every other byproduct of the bathroom needs to be accommodated or scrapped later on. The sink is an extremely important aspect, but does not necessarily have to be located in extreme proximity to the latrine. It needs to be close enough that the user has to cross by the washing station before they leave the restroom. The sink has previously been used for taking care of cosmetic touch ups and sanitary reasons. This often creates a bottleneck situation in which sinks are occupied for longer than they should. There is use for a wall of cosmetic mirrors, but it should stay away from the sink.</p>
        <p>Moving the sink to the entrance of the restroom creates a cleaner and more hygienic environment than in traditional restrooms. By making the entrance of the restroom feature sinks, it allows for a more sanitary environment by making hand-washing accessible to people who do not need to relieve themselves. Moving the sink allows us to allocate more space to stalls as well. Having a public washing station also encourages people to wash their hands and keep the cleaning station tidy. This results in a cleaner environment and less worry regarding bathroom maintenance. There also have been efforts to combine the toilet with the sink by stacking them on top of each other. Frankly, I don't agree that this idea works in a public setting as if the sink clogs, there becomes a major issue of people visiting other stalls creating a larger problem than the one before.</p>
        <h2>The Value of the Urinal</h2>
        <p>At the end of the day, the urinal is a necessity for making unisex restrooms high-capacity. Using a urinal takes a fraction of the time it takes to use a regular toilet, and is the inviting factor for most restroom visits for people who have male genitalia. By creating a row of urinals with saloon style doors that allow for hands free operation, people don't have to watch others stand and urinate as they are walking to the stalls. This style of swinging doors also allows people to see the feet and face of whoever is using the urinal so that they may know if there are others in the restroom for safety and privacy. This set of urinals would be adjacent to the wall of parallel stalls with adequate spacing so that the plumbing may still be shared or kept in close proximity to other plumbing.</p>
        <h2>The Value of the Stall</h2>
        <p>Urinals may be a necessity of high-volume restrooms, but they do not complete all the tasks required for people who need to sit down to use the restroom or for people who need to defecate. Stalls also complete the task of allowing people to dispose of tampons, tissues, and other waste. As a result, they would not be changed very much as they do an extremely efficient job at disposing different types of waste and allocating privacy. Perhaps the style of the stall is a larger problem than the toilet inside it. More often than not, stall doors do not reach the ground, exposing people sitting down. Neighboring stalls also tend to share the same walls which are usually thin and revealing. Stalls would be made more sturdy and feature thicker walls with proper security on the door.</p>
        <h2>Additional Thoughts</h2>
        <p>The sides of the bathroom wall often feature sinks and mirrors. Now that it is empty space, this leaves plenty of room for additional functionality. There is room for a cosmetic mirror, but it is not advised, as nobody wants to touch their face after using the restroom. Featuring additional tools like changing tables allow people to tend to their infant's needs. This idea is also scalable as larger spaces may mirror the stalls to accommodate more people due to a lack of interior sinks. This new layout isn't all-too-different from what is currently done in a few restrooms near the beach or at a public park. However- those restrooms aren't unisex and often operate on a small scale with no opportunity to expand. The benefit of this new layout is that it is scalable by mirroring the stalls back-to-back and adding more urinals and hand-washing stations.</p>
        <h2>Conclusion</h2>
        <p>I'm not going to pretend like I am an architect or civil engineer, and I am more than sure there are others with brilliant ideas better than mine. However, there is an increasing need to accommodate nonbinary and the LGBT community, and most pleas to make unisex bathrooms are being shut down by the prospect of safety. By making an open-concept design that accommodates safety and inclusivity, this might inspire others to do the same with their own renditions and find a solution to this problem.</p>
      </article>
    );
  }
}
