<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', '<%= dbName %>');

/** MySQL database username */
define('DB_USER', '<%= dbUsername %>');

/** MySQL database password */
define('DB_PASSWORD', '<%= dbPassword %>');

/** MySQL hostname */
define('DB_HOST', '<%= dbHost %>');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'QUZ@uuPl0Ei@gGYzI2O*KV*V{(1}GcH+M?_--?=rjkVDD9TYddd(W<{btu6Ko{@I');
define('SECURE_AUTH_KEY',  'XtG!ZO,%bF&hhzc2i<J]=&<O[Yi|!j ;70-mQDWUI2DF&<a(M:(&=|JJAt;zaf!G');
define('LOGGED_IN_KEY',    '+tku3yUQbub]Ca;{$E8^L],a#Lf-0; `4|8EZ7?l-%,%38-9+1:+aNFOE>j}ry(&');
define('NONCE_KEY',        'ks)4oKy_bban-KUi74XXX?1CJuDRNwK*>Lcd(/Tx[gGSC8P]_(M#00BaJzn-3b@P');
define('AUTH_SALT',        '-&,gvL0[rCQ`iW2GOr(+#c.Se&/to[V`V=Q:|mg9pUC7T@6mK7O+rcosc$wzzyd(');
define('SECURE_AUTH_SALT', 'fW`-;zQZ:2Thb% :{`r6m _PAn5BR.4bH~c/6;?.HqT/fr-K)h!iHlBuHA+63V-~');
define('LOGGED_IN_SALT',   'PJC8=,9y8%&>ku|z)s?6]0q.r7,(_k6CwjC:||z%>Z.Yr%9w+N@j$x%PpU>I?>Nr');
define('NONCE_SALT',       'iR+>USb=N#VKN>_:kURvi8e34PqTGKQobB;hSn_HORsvM&`{:kNA=IX]RIQ[{O2`');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = '<%= dbTablePrefix %>';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
    define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
