const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  // Reference to User Schema
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  // SEO friendly URL for user profile
  handle: {
    type: String,
    required: true,
    max: 40
  },
  // User's contact details
  // contact: {
  //     type: Number
  //   },
  // Organization associated with the user
  organization: {
    type: String
  },
  // Website associated with the user (organization/personal)
  websiteLink: {
    type: String
  },
  // Blog maintained by user
  //   blogLink: {
  //     type: String
  //   },
  // User's location
  location: {
    type: String
  },
  // User's preferred locations
  //   preferredLocations: {
  //     type: [String], // array of strings
  //     required: true
  //   },
  // User's current employment status
  status: {
    type: String,
    required: true
  },
  // User's skills set
  skills: {
    type: [String], // array of strings
    required: true
  },
  // User's achievements
  //   achievements: [
  //     // array of objects
  //     {
  //       title: {
  //         // header
  //         type: String,
  //         required: true
  //       },
  //       description: {
  //         // description
  //         type: String,
  //         max: 40
  //       }
  //     }
  //   ],
  // Description about the user
  bio: {
    type: String
  },
  // User's github username
  githubUsername: {
    type: String
  },
  // User's projects
  projects: [
    {
      // array of objects
      title: {
        // project title
        type: String,
        required: true
      },
      from: {
        // start date
        type: Date,
        required: true
      },
      to: {
        // end date
        type: Date
      },
      current: {
        // ongoing (optional)
        type: Boolean,
        default: false
      },
      description: {
        // description
        type: String
      },
      link: {
        // project link
        type: String
      }
    }
  ],
  // User's education
  education: [
    {
      // array of objects
      name: {
        // school/college name
        type: String,
        required: true
      },
      degree: {
        // degree of education
        type: String,
        required: true
      },
      fieldOfStudy: {
        // major subjects/stream
        type: String,
        required: true
      },
      from: {
        // start date
        type: Date,
        required: true
      },
      to: {
        // end date
        type: Date
      },
      current: {
        // ongoing (optional)
        type: Boolean,
        default: false
      },
      description: {
        // description
        type: String
      }
    }
  ],
  // User's experience - internship/job/trainings
  experience: [
    // array of objects
    {
      title: {
        // experience header
        type: String,
        required: true
      },
      organization: {
        // organization name
        type: String,
        required: true
      },
      location: {
        // organization location
        type: String
      },
      from: {
        // start date
        type: Date,
        required: true
      },
      to: {
        // end date
        type: Date
      },
      current: {
        // ongoing (optional)
        type: Boolean,
        default: false
      },
      description: {
        // description
        type: String,
        max: 40
      }
    }
  ],
  // User's social networking links
  socialLinks: {
    linkedin: {
      type: String
    },
    medium: {
      type: String
    },
    behance: {
      type: String
    },
    github: {
      type: String
    },
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    // Date of account creation
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
