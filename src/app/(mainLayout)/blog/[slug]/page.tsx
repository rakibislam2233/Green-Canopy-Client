"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaCalendarAlt, FaUser, FaArrowLeft, FaShare, FaLeaf, FaClock } from "react-icons/fa";
import { notFound } from "next/navigation";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  slug: string;
  tags: string[];
}

const BlogDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  // Static blog posts data with full content
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Best Trees for Small Spaces: Maximizing Your Garden",
      content: `
        <p>Creating a beautiful garden in a small space doesn't mean you have to sacrifice the beauty and benefits of trees. With careful selection and strategic placement, you can enjoy the shade, beauty, and environmental benefits that trees provide, even in compact areas.</p>
        
        <h3>Why Trees Matter in Small Spaces</h3>
        <p>Trees provide numerous benefits even in small gardens:</p>
        <ul>
          <li>Natural cooling and shade</li>
          <li>Air purification</li>
          <li>Privacy screening</li>
          <li>Wildlife habitat</li>
          <li>Increased property value</li>
        </ul>

        <h3>Best Small Space Tree Varieties</h3>
        
        <h4>1. Japanese Maple (Acer palmatum)</h4>
        <p>These stunning trees are perfect for small spaces with their delicate foliage and manageable size. They typically grow 15-20 feet tall and wide, making them ideal for patios and small yards. The variety of leaf colors and shapes available makes them excellent focal points.</p>

        <h4>2. Crabapple Trees</h4>
        <p>Ornamental crabapples offer beautiful spring blooms, colorful fall foliage, and attractive fruit. Most varieties stay under 20 feet, making them perfect for small gardens. Choose disease-resistant varieties like 'Prairifire' or 'Sugar Tyme'.</p>

        <h4>3. Dwarf Fruit Trees</h4>
        <p>Enjoy homegrown fruit even in small spaces with dwarf varieties. Apple, pear, cherry, and citrus trees can all be found in compact sizes. Many can even be grown in large containers on patios.</p>

        <h4>4. Serviceberry (Amelanchier)</h4>
        <p>These native trees offer four-season interest with spring flowers, summer berries, fall color, and attractive winter bark. They typically reach 15-25 feet and attract birds and butterflies.</p>

        <h3>Planting Tips for Small Spaces</h3>
        <p>When planting trees in small areas, consider these important factors:</p>
        
        <h4>Location Selection</h4>
        <ul>
          <li>Consider mature size and avoid planting too close to structures</li>
          <li>Think about root systems and underground utilities</li>
          <li>Plan for adequate sunlight and air circulation</li>
          <li>Consider views from windows and outdoor living areas</li>
        </ul>

        <h4>Container Growing</h4>
        <p>Many trees can thrive in large containers, giving you flexibility in small spaces. Choose containers at least 20 gallons for most trees and ensure proper drainage.</p>

        <h3>Maintenance Considerations</h3>
        <p>Small space trees require regular maintenance to keep them healthy and appropriately sized:</p>
        <ul>
          <li>Annual pruning to maintain shape and size</li>
          <li>Regular watering, especially for container-grown trees</li>
          <li>Proper fertilization in spring</li>
          <li>Disease and pest monitoring</li>
        </ul>

        <h3>Conclusion</h3>
        <p>With thoughtful selection and proper care, trees can be a beautiful and beneficial addition to any small space garden. The key is choosing the right variety for your specific conditions and maintaining them properly as they grow.</p>
      `,
      author: "Dr. Emily Green",
      date: "December 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
      category: "Garden Design",
      slug: "best-trees-small-spaces",
      tags: ["Small Gardens", "Tree Selection", "Urban Gardening", "Landscaping"]
    },
    {
      id: 2,
      title: "Spring Tree Care: Essential Tips for Healthy Growth",
      content: `
        <p>Spring is the most critical time for tree care as your trees wake up from winter dormancy and begin their active growing season. Proper spring care sets the foundation for healthy growth throughout the year.</p>
        
        <h3>Early Spring Assessment</h3>
        <p>Before jumping into active care, take time to thoroughly inspect your trees:</p>
        <ul>
          <li>Look for winter damage such as broken branches or bark damage</li>
          <li>Check for signs of pest infestations or diseases</li>
          <li>Examine the trunk for cracks or cavities</li>
          <li>Assess the overall structure and shape</li>
        </ul>

        <h3>Pruning: The Foundation of Tree Health</h3>
        <p>Spring pruning is essential for tree health and appearance. Here's what you need to know:</p>
        
        <h4>When to Prune</h4>
        <p>The best time for pruning is late winter to early spring, before buds break but after the coldest weather has passed. This timing minimizes stress and reduces disease risk.</p>

        <h4>What to Prune</h4>
        <ul>
          <li>Dead, diseased, or damaged branches (the "3 D's")</li>
          <li>Branches that cross or rub against each other</li>
          <li>Water sprouts and suckers</li>
          <li>Branches growing toward the center of the tree</li>
        </ul>

        <h3>Fertilization Strategy</h3>
        <p>Spring fertilization helps trees recover from winter and supports new growth:</p>
        
        <h4>Soil Testing</h4>
        <p>Before fertilizing, test your soil to understand its pH and nutrient content. Most trees prefer slightly acidic to neutral soil (pH 6.0-7.0).</p>

        <h4>Fertilizer Selection</h4>
        <ul>
          <li>Use slow-release fertilizers for consistent feeding</li>
          <li>Choose balanced fertilizers (10-10-10) for most trees</li>
          <li>Consider organic options like compost or aged manure</li>
          <li>Avoid high-nitrogen fertilizers late in the season</li>
        </ul>

        <h3>Watering Wisdom</h3>
        <p>Proper watering is crucial for spring tree establishment:</p>
        <ul>
          <li>Water deeply but infrequently to encourage deep root growth</li>
          <li>Apply 1-2 inches of water per week</li>
          <li>Water early morning to reduce evaporation and disease risk</li>
          <li>Extend watering area to the drip line of the tree</li>
        </ul>

        <h3>Mulching Benefits</h3>
        <p>Spring is the perfect time to refresh or apply mulch around your trees:</p>
        <ul>
          <li>Maintains soil moisture</li>
          <li>Suppresses weeds</li>
          <li>Regulates soil temperature</li>
          <li>Adds organic matter as it decomposes</li>
        </ul>

        <h4>Proper Mulching Technique</h4>
        <ul>
          <li>Apply 2-4 inches of organic mulch</li>
          <li>Keep mulch 6 inches away from the tree trunk</li>
          <li>Extend mulch to the drip line if possible</li>
          <li>Use organic materials like wood chips or shredded bark</li>
        </ul>

        <h3>Pest and Disease Prevention</h3>
        <p>Spring is the time to implement preventive pest and disease management:</p>
        <ul>
          <li>Apply dormant oil sprays before bud break</li>
          <li>Inspect for early signs of pest activity</li>
          <li>Remove fallen leaves and debris that harbor diseases</li>
          <li>Maintain good air circulation around trees</li>
        </ul>

        <h3>Conclusion</h3>
        <p>Consistent spring care is an investment in your trees' long-term health and beauty. By following these essential practices, you'll help ensure your trees thrive throughout the growing season and for years to come.</p>
      `,
      author: "Mike Rodriguez",
      date: "December 10, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop",
      category: "Tree Care",
      slug: "spring-tree-care-tips",
      tags: ["Tree Care", "Spring Maintenance", "Pruning", "Fertilization"]
    },
    {
      id: 3,
      title: "Native Trees: Why They're Perfect for Your Local Landscape",
      content: `
        <p>Native trees are increasingly recognized as the foundation of sustainable landscaping. These trees, which evolved in your local region over thousands of years, offer unmatched benefits for both your garden and the local ecosystem.</p>
        
        <h3>What Makes a Tree "Native"?</h3>
        <p>Native trees are species that occurred naturally in your region before European settlement. They've adapted to local climate conditions, soil types, and wildlife over millennia, making them perfectly suited to thrive in your area.</p>

        <h3>Environmental Benefits</h3>
        
        <h4>Wildlife Support</h4>
        <p>Native trees are essential for local wildlife:</p>
        <ul>
          <li>Support 35x more butterfly and moth species than non-natives</li>
          <li>Provide food sources birds need for successful reproduction</li>
          <li>Offer shelter and nesting sites for various wildlife</li>
          <li>Create corridors for wildlife movement</li>
        </ul>

        <h4>Ecosystem Services</h4>
        <p>Native trees provide crucial environmental benefits:</p>
        <ul>
          <li>Superior carbon sequestration capabilities</li>
          <li>Improved air and water quality</li>
          <li>Soil stabilization and erosion control</li>
          <li>Natural stormwater management</li>
        </ul>

        <h3>Practical Advantages for Homeowners</h3>
        
        <h4>Low Maintenance Requirements</h4>
        <p>Because they're adapted to local conditions, native trees typically require:</p>
        <ul>
          <li>Less watering once established</li>
          <li>Minimal fertilization</li>
          <li>Reduced pest and disease problems</li>
          <li>Less pruning and maintenance</li>
        </ul>

        <h4>Cost Savings</h4>
        <p>The reduced maintenance needs translate to:</p>
        <ul>
          <li>Lower water bills</li>
          <li>Reduced need for fertilizers and pesticides</li>
          <li>Less frequent replacement due to better survival rates</li>
          <li>Minimal soil amendment requirements</li>
        </ul>

        <h3>Popular Native Trees by Region</h3>
        
        <h4>Northeast Region</h4>
        <ul>
          <li><strong>Sugar Maple</strong> - Spectacular fall color and syrup production</li>
          <li><strong>White Oak</strong> - Long-lived shade tree supporting wildlife</li>
          <li><strong>Eastern Redbud</strong> - Beautiful spring flowers and heart-shaped leaves</li>
          <li><strong>American Hornbeam</strong> - Understory tree with attractive bark</li>
        </ul>

        <h4>Southeast Region</h4>
        <ul>
          <li><strong>Live Oak</strong> - Iconic spreading evergreen tree</li>
          <li><strong>Bald Cypress</strong> - Unique deciduous conifer</li>
          <li><strong>Southern Magnolia</strong> - Fragrant flowers and glossy leaves</li>
          <li><strong>Longleaf Pine</strong> - Fire-adapted and wildlife-friendly</li>
        </ul>

        <h3>Selecting the Right Native Trees</h3>
        
        <h4>Site Assessment</h4>
        <p>Consider these factors when selecting native trees:</p>
        <ul>
          <li>Soil type and drainage</li>
          <li>Sun exposure throughout the day</li>
          <li>Available space for mature size</li>
          <li>Existing vegetation and microclimates</li>
        </ul>

        <h4>Purpose and Goals</h4>
        <p>Think about what you want your trees to accomplish:</p>
        <ul>
          <li>Shade for energy savings</li>
          <li>Privacy screening</li>
          <li>Wildlife habitat creation</li>
          <li>Seasonal interest and beauty</li>
        </ul>

        <h3>Planting and Establishment</h3>
        <p>While native trees are generally easier to establish, proper planting is still important:</p>
        <ul>
          <li>Plant in fall for best establishment</li>
          <li>Dig holes 2-3 times wider than the root ball</li>
          <li>Plant at the same depth as in the nursery</li>
          <li>Water regularly during the first year</li>
          <li>Mulch to conserve moisture and suppress weeds</li>
        </ul>

        <h3>Common Misconceptions</h3>
        
        <h4>"Native trees are boring"</h4>
        <p>Many native trees offer stunning beauty:</p>
        <ul>
          <li>Spectacular fall colors</li>
          <li>Attractive flowers and fruits</li>
          <li>Interesting bark and form</li>
          <li>Year-round visual interest</li>
        </ul>

        <h3>Conclusion</h3>
        <p>Choosing native trees is one of the best decisions you can make for your landscape. They offer beauty, require less maintenance, support local wildlife, and contribute to a healthier environment. By selecting native species, you're creating a sustainable landscape that will thrive for generations.</p>
      `,
      author: "Sarah Chen",
      date: "December 8, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=400&fit=crop",
      category: "Sustainability",
      slug: "native-trees-benefits",
      tags: ["Native Plants", "Sustainability", "Wildlife", "Eco-friendly"]
    },
    {
      id: 4,
      title: "Fruit Trees 101: Growing Your Own Orchard",
      content: `
        <p>There's nothing quite like the satisfaction of harvesting fresh fruit from your own trees. Whether you have a large backyard or a small patio, you can grow delicious, healthy fruit with the right knowledge and planning.</p>
        
        <h3>Planning Your Home Orchard</h3>
        
        <h4>Space Requirements</h4>
        <p>Different fruit trees have varying space needs:</p>
        <ul>
          <li><strong>Standard trees:</strong> 20-25 feet apart</li>
          <li><strong>Semi-dwarf trees:</strong> 12-15 feet apart</li>
          <li><strong>Dwarf trees:</strong> 8-10 feet apart</li>
          <li><strong>Columnar varieties:</strong> 4-6 feet apart</li>
        </ul>

        <h4>Site Selection</h4>
        <p>Most fruit trees require:</p>
        <ul>
          <li>6-8 hours of direct sunlight daily</li>
          <li>Well-draining soil with pH 6.0-7.0</li>
          <li>Protection from strong winds</li>
          <li>Good air circulation to prevent disease</li>
          <li>Access to water for irrigation</li>
        </ul>

        <h3>Popular Fruit Trees for Home Orchards</h3>
        
        <h4>Apple Trees</h4>
        <p>Apples are among the easiest fruit trees to grow:</p>
        <ul>
          <li>Wide variety of cultivars available</li>
          <li>Generally cold-hardy</li>
          <li>Most varieties need cross-pollination</li>
          <li>Harvest from late summer through fall</li>
        </ul>
        <p><strong>Recommended varieties:</strong> Honeycrisp, Gala, Granny Smith, Fuji</p>

        <h4>Cherry Trees</h4>
        <p>Cherries offer beautiful spring blossoms and delicious fruit:</p>
        <ul>
          <li><strong>Sweet cherries:</strong> Need cross-pollination, less cold-hardy</li>
          <li><strong>Tart cherries:</strong> Self-pollinating, more cold-hardy</li>
          <li>Harvest in early to mid-summer</li>
          <li>Attractive to birds - may need protection</li>
        </ul>

        <h4>Pear Trees</h4>
        <p>Pears are long-lived and productive:</p>
        <ul>
          <li>Generally disease-resistant</li>
          <li>Most varieties need cross-pollination</li>
          <li>Harvest in late summer to fall</li>
          <li>Fruit ripens off the tree</li>
        </ul>

        <h4>Citrus Trees</h4>
        <p>Perfect for warm climates or container growing:</p>
        <ul>
          <li>Evergreen with fragrant flowers</li>
          <li>Most are self-pollinating</li>
          <li>Can be grown in containers in cold climates</li>
          <li>Harvest timing varies by variety</li>
        </ul>

        <h3>Planting and Early Care</h3>
        
        <h4>Best Planting Time</h4>
        <ul>
          <li><strong>Bare root trees:</strong> Late winter to early spring</li>
          <li><strong>Container trees:</strong> Spring through fall</li>
          <li>Avoid planting during extreme weather</li>
        </ul>

        <h4>Planting Process</h4>
        <ol>
          <li>Dig hole 2-3 times wider than root ball</li>
          <li>Plant at same depth as in nursery</li>
          <li>Backfill with native soil</li>
          <li>Water thoroughly after planting</li>
          <li>Apply 2-3 inch layer of mulch</li>
        </ol>

        <h3>Ongoing Care and Maintenance</h3>
        
        <h4>Watering</h4>
        <ul>
          <li>Deep, infrequent watering is best</li>
          <li>Newly planted trees need regular water</li>
          <li>Established trees: 1 inch per week</li>
          <li>Reduce watering in fall to encourage dormancy</li>
        </ul>

        <h4>Fertilization</h4>
        <ul>
          <li>Test soil before fertilizing</li>
          <li>Apply balanced fertilizer in early spring</li>
          <li>Avoid over-fertilizing with nitrogen</li>
          <li>Compost provides slow-release nutrients</li>
        </ul>

        <h4>Pruning</h4>
        <p>Annual pruning is essential for:</p>
        <ul>
          <li>Maintaining tree shape and size</li>
          <li>Improving air circulation</li>
          <li>Removing dead or diseased wood</li>
          <li>Encouraging fruit production</li>
        </ul>

        <h3>Pest and Disease Management</h3>
        
        <h4>Common Pests</h4>
        <ul>
          <li><strong>Aphids:</strong> Use beneficial insects or insecticidal soap</li>
          <li><strong>Codling moth:</strong> Pheromone traps and proper timing</li>
          <li><strong>Scale insects:</strong> Dormant oil sprays</li>
          <li><strong>Fruit flies:</strong> Sanitation and traps</li>
        </ul>

        <h4>Disease Prevention</h4>
        <ul>
          <li>Choose disease-resistant varieties</li>
          <li>Ensure good air circulation</li>
          <li>Clean up fallen fruit and leaves</li>
          <li>Avoid overhead watering</li>
        </ul>

        <h3>Harvesting and Storage</h3>
        
        <h4>Determining Ripeness</h4>
        <ul>
          <li><strong>Color:</strong> Fruit develops characteristic color</li>
          <li><strong>Feel:</strong> Slight give when gently pressed</li>
          <li><strong>Taste:</strong> Sweet flavor develops</li>
          <li><strong>Easy separation:</strong> Fruit comes off easily</li>
        </ul>

        <h4>Storage Tips</h4>
        <ul>
          <li>Handle fruit carefully to avoid bruising</li>
          <li>Store different varieties separately</li>
          <li>Cool storage extends shelf life</li>
          <li>Use damaged fruit first</li>
        </ul>

        <h3>Conclusion</h3>
        <p>Growing your own fruit trees is a rewarding long-term investment. While it requires patience and ongoing care, the joy of harvesting your own fresh, pesticide-free fruit makes every effort worthwhile. Start with varieties suited to your climate and gradually expand your orchard as you gain experience.</p>
      `,
      author: "James Wilson",
      date: "December 5, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=400&fit=crop",
      category: "Fruit Trees",
      slug: "fruit-trees-guide",
      tags: ["Fruit Trees", "Orchard", "Home Growing", "Harvesting"]
    },
    {
      id: 5,
      title: "Winter Tree Protection: Keeping Your Trees Safe",
      content: `
        <p>Winter can be harsh on trees, especially young ones and species that are marginally hardy in your area. Proper winter protection ensures your trees survive and thrive for years to come.</p>
        
        <h3>Understanding Winter Damage</h3>
        
        <h4>Types of Winter Damage</h4>
        <ul>
          <li><strong>Cold injury:</strong> Damage from extreme temperatures</li>
          <li><strong>Desiccation:</strong> Dehydration from winter winds</li>
          <li><strong>Sun scald:</strong> Bark damage from temperature fluctuations</li>
          <li><strong>Salt damage:</strong> Injury from road salt and de-icing chemicals</li>
          <li><strong>Mechanical damage:</strong> Broken branches from snow and ice</li>
        </ul>

        <h4>Vulnerable Trees</h4>
        <p>Some trees are more susceptible to winter damage:</p>
        <ul>
          <li>Newly planted trees (first 2-3 years)</li>
          <li>Non-native or marginally hardy species</li>
          <li>Trees with thin bark (maples, cherries)</li>
          <li>Evergreens in exposed locations</li>
          <li>Trees near roads and sidewalks</li>
        </ul>

        <h3>Pre-Winter Preparation</h3>
        
        <h4>Fall Watering</h4>
        <p>Proper hydration before winter is crucial:</p>
        <ul>
          <li>Water trees thoroughly in fall until ground freezes</li>
          <li>Pay special attention to evergreens</li>
          <li>Ensure soil moisture extends to drip line</li>
          <li>Stop fertilizing 6-8 weeks before first frost</li>
        </ul>

        <h4>Late Fall Pruning</h4>
        <ul>
          <li>Remove dead, diseased, or damaged branches</li>
          <li>Eliminate weak branch attachments</li>
          <li>Avoid major pruning that stimulates new growth</li>
          <li>Clean up fallen leaves and debris</li>
        </ul>

        <h3>Physical Protection Methods</h3>
        
        <h4>Tree Wrapping</h4>
        <p>Protect trunks from sun scald and frost cracks:</p>
        <ul>
          <li>Use tree wrap or burlap strips</li>
          <li>Start at base and spiral upward</li>
          <li>Cover trunk to lowest branches</li>
          <li>Remove wrap in spring to prevent girdling</li>
        </ul>

        <h4>Windscreens</h4>
        <p>Shield trees from drying winter winds:</p>
        <ul>
          <li>Install burlap screens on windward side</li>
          <li>Build frames 2-3 feet from tree</li>
          <li>Ensure adequate air circulation</li>
          <li>Particularly important for evergreens</li>
        </ul>

        <h4>Mulching</h4>
        <p>Insulate roots with proper mulching:</p>
        <ul>
          <li>Apply 3-4 inches of organic mulch</li>
          <li>Extend to drip line if possible</li>
          <li>Keep mulch 6 inches from trunk</li>
          <li>Use materials like wood chips or shredded leaves</li>
        </ul>

        <h3>Specialized Protection Techniques</h3>
        
        <h4>Anti-Desiccant Sprays</h4>
        <p>Reduce moisture loss from evergreen foliage:</p>
        <ul>
          <li>Apply on calm, dry days above 40°F</li>
          <li>Spray all foliage surfaces</li>
          <li>Reapply mid-winter if needed</li>
          <li>Most effective on broadleaf evergreens</li>
        </ul>

        <h4>Snow and Ice Management</h4>
        <ul>
          <li>Gently brush light snow from branches</li>
          <li>Never attempt to remove ice - wait for natural melting</li>
          <li>Avoid shaking branches which can cause breakage</li>
          <li>Prop up heavily loaded branches if possible</li>
        </ul>

        <h3>Salt and Chemical Protection</h3>
        
        <h4>Road Salt Damage Prevention</h4>
        <ul>
          <li>Plant salt-tolerant species near roadways</li>
          <li>Install physical barriers to deflect salt spray</li>
          <li>Flush soil with water in spring</li>
          <li>Use alternative de-icing products when possible</li>
        </ul>

        <h4>Salt-Tolerant Tree Options</h4>
        <ul>
          <li>Norway Maple</li>
          <li>Green Ash</li>
          <li>Austrian Pine</li>
          <li>Honey Locust</li>
          <li>Colorado Blue Spruce</li>
        </ul>

        <h3>Container Tree Protection</h3>
        <p>Potted trees need extra protection:</p>
        <ul>
          <li>Move containers to protected locations</li>
          <li>Insulate containers with bubble wrap or burlap</li>
          <li>Group containers together for mutual protection</li>
          <li>Water when soil isn't frozen</li>
          <li>Consider moving into unheated garage</li>
        </ul>

        <h3>Monitoring During Winter</h3>
        
        <h4>Regular Inspections</h4>
        <ul>
          <li>Check for signs of damage after storms</li>
          <li>Monitor wrapping materials for tightness</li>
          <li>Ensure protective structures remain stable</li>
          <li>Look for pest activity in bark</li>
        </ul>

        <h4>Emergency Response</h4>
        <ul>
          <li>Document damage with photos</li>
          <li>Remove broken branches cleanly</li>
          <li>Avoid walking on frozen ground around trees</li>
          <li>Contact arborists for major damage</li>
        </ul>

        <h3>Spring Recovery</h3>
        
        <h4>Post-Winter Assessment</h4>
        <ul>
          <li>Remove all winter protection materials</li>
          <li>Inspect for winter damage</li>
          <li>Prune damaged branches properly</li>
          <li>Water thoroughly as ground thaws</li>
        </ul>

        <h4>Recovery Support</h4>
        <ul>
          <li>Avoid fertilizing damaged trees immediately</li>
          <li>Provide consistent water during recovery</li>
          <li>Monitor for secondary pest problems</li>
          <li>Consider professional consultation for severely damaged trees</li>
        </ul>

        <h3>Conclusion</h3>
        <p>Proactive winter protection is essential for maintaining healthy trees. By understanding the risks and implementing appropriate protection measures, you can help your trees survive harsh winter conditions and emerge ready for vigorous spring growth. Remember that young trees and marginally hardy species need the most attention, but even established trees benefit from basic winter care.</p>
      `,
      author: "Dr. Emily Green",
      date: "December 1, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
      category: "Seasonal Care",
      slug: "winter-tree-protection",
      tags: ["Winter Care", "Tree Protection", "Seasonal Maintenance", "Cold Weather"]
    },
    {
      id: 6,
      title: "The Art of Tree Placement: Design Principles for Your Landscape",
      content: `
        <p>Strategic tree placement is both an art and a science that can transform your landscape from ordinary to extraordinary. Understanding design principles and practical considerations will help you create a beautiful, functional outdoor space that enhances your property's value and your quality of life.</p>
        
        <h3>Fundamental Design Principles</h3>
        
        <h4>Scale and Proportion</h4>
        <p>The relationship between trees and other landscape elements is crucial:</p>
        <ul>
          <li>Large trees should complement, not overwhelm, your home</li>
          <li>Consider mature size when planning placement</li>
          <li>Use smaller trees near patios and seating areas</li>
          <li>Balance tree sizes throughout the landscape</li>
        </ul>

        <h4>Unity and Rhythm</h4>
        <p>Create cohesion in your landscape design:</p>
        <ul>
          <li>Repeat tree varieties or similar characteristics</li>
          <li>Use consistent spacing for formal designs</li>
          <li>Vary spacing slightly for natural, informal looks</li>
          <li>Consider seasonal changes and year-round interest</li>
        </ul>

        <h4>Focal Points and Specimen Trees</h4>
        <p>Use trees to create visual interest:</p>
        <ul>
          <li>Place specimen trees where they'll be noticed</li>
          <li>Use unique forms, colors, or textures as focal points</li>
          <li>Frame views and direct attention</li>
          <li>Avoid competing focal points</li>
        </ul>

        <h3>Functional Considerations</h3>
        
        <h4>Climate Control and Energy Efficiency</h4>
        <p>Strategic tree placement can significantly impact your energy bills:</p>
        <ul>
          <li><strong>Summer cooling:</strong> Plant deciduous trees on south and west sides</li>
          <li><strong>Winter warmth:</strong> Allow winter sun through bare branches</li>
          <li><strong>Wind protection:</strong> Use evergreens as windbreaks on north side</li>
          <li><strong>Air conditioning:</strong> Shade units to improve efficiency</li>
        </ul>

        <h4>Privacy and Screening</h4>
        <ul>
          <li>Use evergreen trees for year-round privacy</li>
          <li>Layer different heights for effective screening</li>
          <li>Consider mature spread when spacing</li>
          <li>Plan for gaps and sight lines</li>
        </ul>

        <h4>Practical Infrastructure Considerations</h4>
        <ul>
          <li>Keep trees away from power lines</li>
          <li>Consider underground utilities before planting</li>
          <li>Maintain clearances from buildings and foundations</li>
          <li>Plan for future maintenance access</li>
        </ul>

        <h3>Creating Outdoor Rooms</h3>
        
        <h4>Defining Spaces</h4>
        <p>Use trees to create distinct areas in your landscape:</p>
        <ul>
          <li>Frame outdoor dining areas with shade trees</li>
          <li>Create intimate seating areas with smaller trees</li>
          <li>Use trees as natural boundaries between spaces</li>
          <li>Consider overhead canopy and enclosure</li>
        </ul>

        <h4>Transition Zones</h4>
        <ul>
          <li>Gradually change tree sizes from large to small</li>
          <li>Use medium-sized trees as transitions</li>
          <li>Create smooth visual flow between areas</li>
          <li>Consider seasonal changes in screening</li>
        </ul>

        <h3>Working with Existing Conditions</h3>
        
        <h4>Site Analysis</h4>
        <p>Thoroughly assess your site before placing trees:</p>
        <ul>
          <li><strong>Soil conditions:</strong> Drainage, pH, compaction</li>
          <li><strong>Light patterns:</strong> Sun and shade throughout the day</li>
          <li><strong>Microclimates:</strong> Areas of different conditions</li>
          <li><strong>Existing vegetation:</strong> What's already thriving</li>
        </ul>

        <h4>Topography and Drainage</h4>
        <ul>
          <li>Use trees to stabilize slopes</li>
          <li>Avoid wet areas unless using water-tolerant species</li>
          <li>Consider how placement affects water flow</li>
          <li>Plan for seasonal water patterns</li>
        </ul>

        <h3>Seasonal Interest and Succession</h3>
        
        <h4>Four-Season Planning</h4>
        <ul>
          <li><strong>Spring:</strong> Plan for flowering trees and new growth</li>
          <li><strong>Summer:</strong> Consider shade patterns and cooling effects</li>
          <li><strong>Fall:</strong> Include trees with autumn color</li>
          <li><strong>Winter:</strong> Plan for evergreen structure and bark interest</li>
        </ul>

        <h4>Succession Planting</h4>
        <p>Plan for long-term landscape evolution:</p>
        <ul>
          <li>Plant fast-growing temporary trees while slow-growing trees establish</li>
          <li>Consider lifespan differences between species</li>
          <li>Plan replacement strategies for aging trees</li>
          <li>Diversify species for resilience</li>
        </ul>

        <h3>Common Placement Mistakes to Avoid</h3>
        
        <h4>Planning Errors</h4>
        <ul>
          <li>Not considering mature size</li>
          <li>Planting too close to structures</li>
          <li>Ignoring utility lines and underground services</li>
          <li>Failing to consider neighbor impacts</li>
        </ul>

        <h4>Design Mistakes</h4>
        <ul>
          <li>Creating monotonous rows or patterns</li>
          <li>Competing focal points</li>
          <li>Poor scale relationships</li>
          <li>Blocking important views</li>
        </ul>

        <h3>Professional Design Tips</h3>
        
        <h4>Visual Techniques</h4>
        <ul>
          <li>Use odd numbers for natural groupings</li>
          <li>Create layers with varying heights</li>
          <li>Frame views rather than blocking them</li>
          <li>Use repetition to create unity</li>
        </ul>

        <h4>Long-term Thinking</h4>
        <ul>
          <li>Visualize trees at mature size</li>
          <li>Plan for 20-50 year landscape evolution</li>
          <li>Consider climate change impacts</li>
          <li>Think about future property needs</li>
        </ul>

        <h3>Working with Professionals</h3>
        
        <h4>When to Consult Experts</h4>
        <ul>
          <li>Complex site conditions</li>
          <li>Large-scale installations</li>
          <li>Valuable existing trees</li>
          <li>Utility line concerns</li>
        </ul>

        <h4>Types of Professionals</h4>
        <ul>
          <li><strong>Landscape architects:</strong> Overall design and planning</li>
          <li><strong>Certified arborists:</strong> Tree health and placement</li>
          <li><strong>Landscape designers:</strong> Aesthetic and functional design</li>
          <li><strong>Horticulturists:</strong> Plant selection and care</li>
        </ul>

        <h3>Conclusion</h3>
        <p>Thoughtful tree placement is an investment in your property's future. By considering both aesthetic principles and practical needs, you can create a landscape that's beautiful, functional, and sustainable. Take time to plan carefully, considering how your decisions will look and function years from now. Remember that trees are long-term landscape elements that will shape your outdoor environment for generations.</p>
      `,
      author: "Lisa Park",
      date: "November 28, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=400&fit=crop",
      category: "Landscape Design",
      slug: "tree-placement-design",
      tags: ["Landscape Design", "Tree Placement", "Garden Planning", "Design Principles"]
    }
  ];

  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-8 left-8"
        >
          <Link
            href="/blog"
            className="flex items-center text-white hover:text-green-300 transition-colors duration-300 bg-black/30 hover:bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium mr-4">
                <FaLeaf className="mr-2" />
                {post.category}
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              {post.title}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center text-white/90 gap-6"
            >
              <div className="flex items-center">
                <FaUser className="mr-2" />
                <span>By {post.author}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2" />
                <span>{post.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
        >
          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-semibold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-green-600 prose-a:no-underline hover:prose-a:text-green-700 prose-strong:text-gray-800 prose-ul:text-gray-600 prose-ol:text-gray-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-800">Share this article</h4>
              <button className="flex items-center text-green-600 hover:text-green-700 transition-colors duration-300">
                <FaShare className="mr-2" />
                Share
              </button>
            </div>
          </div>
        </motion.article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <FaCalendarAlt className="mr-2" />
                        <span>{relatedPost.date}</span>
                        <span className="mx-2">•</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default BlogDetailPage;