export interface Story {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

export const STORIES: Story[] = [
  {
    id: 'story1',
    title: 'The Anatomy of Grails',
    category: 'Design',
    date: 'June 2026',
    excerpt: 'An examination of why certain silhouettes transcend commodity status to enter the realm of museum art and historical collectibles.',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800',
    content: `
      <p>In the contemporary landscape of fashion and design, the term "grail" has evolved from a slang term of extreme desirability to a recognized category of cultural assets. Footwear is no longer merely utility; it is a canvas of historical significance, storytelling, and industrial design innovation.</p>
      
      <p>The genesis of this transformation can be traced back to 1985 with the release of the Air Jordan 1. What began as a signature basketball sneaker quickly became a symbol of rebellion, athletic prowess, and style. The ban by the NBA, combined with Michael Jordan's unmatched charisma, created a narrative that transcended sports. Today, early Jordan releases are auctioned alongside fine art at Sotheby's and Christie's.</p>
      
      <h4>The Elements of a Grail</h4>
      <p>Several critical factors dictate why a silhouette achieves grail status:</p>
      <ul>
        <li><strong>Historical Narrative:</strong> Every grail carries an origin story. Whether it is the banned colorway of the AJ1 or the cultural shift marked by the Yeezy Boost 350, the product represents a specific milestone in culture.</li>
        <li><strong>Scarcity and Distribution:</strong> Exclusivity remains a cornerstone. Tight tier-0 distribution and limited production runs create a structural supply deficit that amplifies demand.</li>
        <li><strong>Aesthetic Innovation:</strong> Grails often disrupt established design rules. The structural asymmetry of Off-White's "The Ten" or the organic sculptural curves of Yeezy Foam Runners redefined the visual grammar of footwear.</li>
      </ul>
      
      <p>For the collector, owning a grail is an act of curation and self-expression. It is a physical archive of culture, preserved and appreciated for its contribution to design history.</p>
    `
  },
  {
    id: 'story2',
    title: 'Terrace Footwear Revival',
    category: 'History',
    date: 'May 2026',
    excerpt: 'Tracing the journey of low-profile court shoes from European football stands of the 80s to the fashion capital runways of modern Milan.',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800',
    content: `
      <p>The resurgence of low-profile terrace footwear is a testament to the cyclical nature of fashion and the enduring power of subcultural authenticity. The Sambas, Gazelles, and SL 72s that dominate modern fashion capitals were not designed for the runway—they were born on athletic tracks and football pitches.</p>
      
      <p>In the late 1970s and 1980s, UK football fans traveling across Europe for away matches began adopting continental sportswear. Brands like Adidas and Puma became badges of honor. This "Casual" subculture prized clean lines, low profiles, and minimal designs. The terrace sneaker was a vital part of this uniform—discreet yet recognizable.</p>
      
      <h4>From Stands to Runways</h4>
      <p>The transition from sportswear to high fashion represents a fascinating cultural shift:</p>
      <ul>
        <li><strong>Subcultural Capital:</strong> The terrace shoe represents a raw, working-class subculture that high fashion houses consistently look to for inspiration.</li>
        <li><strong>Collaboration as a Bridge:</strong> High-profile partnerships, such as Wales Bonner x Adidas and Gucci x Adidas, elevated the simple Samba silhouette to a luxury fashion item.</li>
        <li><strong>Versatile Minimalism:</strong> The low-profile gum sole and clean leather panels provide a perfect neutral base for a variety of contemporary styles, from relaxed tailoring to streetwear.</li>
      </ul>
      
      <p>As streetwear moves away from the chunky, over-engineered silhouettes of the late 2010s, the terrace shoe stands as the definitive replacement: light, authentic, and historically rich.</p>
    `
  },
  {
    id: 'story3',
    title: 'Collaborative Alchemy',
    category: 'Culture',
    date: 'April 2026',
    excerpt: 'How designers bridge high-fashion runways and rubber soles to construct storytelling models that resonate across youth cultures.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800',
    content: `
      <p>Footwear collaborations have evolved from basic color changes to complex exercises in architectural re-engineering and storytelling. The modern collaborative sneaker is an artistic dialog between brand heritage and external creative visionaries.</p>
      
      <p>The late Virgil Abloh's "The Ten" collaboration with Nike remains a benchmark for this approach. Rather than simply applying new colors, Abloh deconstructed the shoes, exposing the foam, adding industrial text, and using zip-ties. It was an intellectual critique of product design itself, executed on a mass-market scale.</p>
      
      <h4>The Power of Storytelling</h4>
      <p>Successful sneaker collaborations leverage three key principles:</p>
      <ul>
        <li><strong>Deconstruction and Reassembly:</strong> Altering structural elements, raw edges, and exposed materials creates a tactile sense of process.</li>
        <li><strong>Cross-disciplinary Narrative:</strong> Merging music, skate culture, and architecture—as seen in Travis Scott's Nike collaborations—brings diverse audiences into sneaker culture.</li>
        <li><strong>Brand Tension:</strong> Putting luxury designers (e.g., Aime Leon Dore or Fear of God) in control of mainstream sports brands creates a compelling aesthetic contrast.</li>
      </ul>
      
      <p>Collaborative alchemy is not about logos; it is about building products that carry a distinct point of view. It transforms footwear into a physical record of cultural collaboration.</p>
    `
  }
];
