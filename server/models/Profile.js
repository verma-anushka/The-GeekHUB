const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  // Reference to User Schema
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  // avatar: {
  //   type: String,
  //   default:
  //     "https://cdn.pixabay.com/photo/2014/04/02/16/26/figure-307268_960_720.png"
  // },
  // avatarId: {
  //   type: String,
  //   default: "https://cdn.pixabay.com/photo/2014/04/02/16/26/figure-307268_960_720.png"
  //     .public_id
  // },
  // bannerImg: {
  //   type: String,
  //   default:
  //     "https://cdn.pixabay.com/photo/2014/04/02/16/26/figure-307268_960_720.png"
  // },
  // bannerImgId: {
  //   type: String,
  //   default: "https://cdn.pixabay.com/photo/2014/04/02/16/26/figure-307268_960_720.png"
  //     .public_id
  // },
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
  //       // header
  //       title: {
  //         type: String,
  //         required: true
  //       },
  //       // description
  //       description: {
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
    // array of objects
    {
      // project title
      title: {
        type: String,
        required: true
      },
      // start date
      from: {
        type: Date,
        required: true
      },
      // end date
      to: {
        type: Date
      },
      // ongoing (optional)
      current: {
        type: Boolean,
        default: false
      },
      // description
      description: {
        type: String
      },
      // project link
      link: {
        type: String
      }
    }
  ],
  // User's education
  education: [
    // array of objects
    {
      // school/college name
      name: {
        type: String,
        required: true
      },
      // degree of education
      degree: {
        type: String,
        required: true
      },
      // major subjects/stream
      fieldOfStudy: {
        type: String,
        required: true
      },
      // start date
      from: {
        type: Date,
        required: true
      },
      // end date
      to: {
        type: Date
      },
      // ongoing (optional)
      current: {
        type: Boolean,
        default: false
      },
      // description
      description: {
        type: String
      }
    }
  ],
  // User's experience - internship/job/trainings
  experience: [
    // array of objects
    {
      // experience header
      title: {
        type: String,
        required: true
      },
      // organization name
      organization: {
        type: String,
        required: true
      },
      // organization location
      location: {
        type: String
      },
      // start date
      from: {
        type: Date,
        required: true
      },
      // end date
      to: {
        type: Date
      },
      // ongoing (optional)
      current: {
        type: Boolean,
        default: false
      },
      // description
      description: {
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

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //   c20

  // # followers of a user
  followers: [
    // array of objects
    {
      // Reference to User Schema
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  // Date of account creation
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
