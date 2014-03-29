<?php
/**
 * _s functions and definitions
 *
 * @package _s
 */

/*=============================================================
 *                       INIT AND SETUP                       *
 *============================================================*/

if ( ! function_exists( '_s_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which runs
 * before the init hook. The init hook is too late for some features, such as indicating
 * support post thumbnails.
 */
function _s_setup() {

    /**
     * Make theme available for translation
     * Translations can be filed in the /languages/ directory
     */
    load_theme_textdomain( '_s', get_template_directory() . '/languages' );

    // This theme styles the visual editor to resemble the theme style.
    add_editor_style( array( 'assets/css/editor-style.css' ) );

    /**
     * Add default posts and comments RSS feed links to head
     */
    add_theme_support( 'automatic-feed-links' );

    /**
     * Enable support for Post Thumbnails on posts and pages
     *
     * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
     */
    add_theme_support( 'post-thumbnails' );

    /**
     * Enable support for Post Formats
     */
    add_theme_support( 'post-formats', array( 'aside', 'image', 'video', 'quote', 'link' ) );

    /**
     * Setup the WordPress core custom background feature.
     */
    add_theme_support( 'custom-background', apply_filters( '_s_custom_background_args', array(
        'default-color' => 'ffffff',
        'default-image' => '',
    ) ) );

    /**
     * This theme uses wp_nav_menu() in one location.
     */
    register_nav_menus( array(
        'primary' => __( 'Primary Menu', '_s' ),
    ) );
}
endif; // _s_setup
add_action( 'after_setup_theme', '_s_setup' );


/**
 * Enqueue scripts and styles
 */
if ( ! function_exists( '_s_scripts' ) ) :
function _s_scripts() {
    wp_register_style( '_s-style', get_template_directory_uri() . '/style.css' );
    wp_register_style( '_s-lteie8-style', get_template_directory_uri() . '/assets/css/lteie8.css' );

    wp_register_script( '_s-modernizr', get_template_directory_uri() . '/assets/js/lib/modernizr.js', array(), '20140101', false );
    wp_register_script( '_s-respond', get_template_directory_uri() . '/assets/js/lib/respond.min.js', array(), '20140101', false );
    wp_register_script( '_s-selectivizr', get_template_directory_uri() . '/assets/js/lib/selectivizr.min.js', array('jquery'), '20140101', false );
    wp_register_script( '_s-skip-link-focus-fix', get_template_directory_uri() . '/assets/js/skip-link-focus-fix.js', array(), '20140101', true );
    wp_register_script( '_s-keyboard-image-navigation', get_template_directory_uri() . '/assets/js/keyboard-image-navigation.js', array( 'jquery' ), '20140101', true );
    wp_register_script( '_s-js-script', get_template_directory_uri() . '/assets/js/script.js', array('jquery'), '20140101', true );

    wp_enqueue_style( '_s-style' );
    if( preg_match('/(?i)msie [2-8]/',$_SERVER['HTTP_USER_AGENT']) ) {
        // if IE<=8
        wp_enqueue_style( '_s-lteie8-style' );
        wp_enqueue_script( '_s-respond' );
        wp_enqueue_script( '_s-selectivizr' );
    }

    wp_enqueue_script( '_s-modernizr' );
    wp_enqueue_script( '_s-skip-link-focus-fix' );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }

    if ( is_singular() && wp_attachment_is_image() ) {
        wp_enqueue_script( '_s-keyboard-image-navigation' );
    }

    wp_enqueue_script( '_s-js-script' );
}
add_action( 'wp_enqueue_scripts', '_s_scripts' );
endif; // _s_scripts


/**
 * Enqueue admin scripts and styles
 */
if ( ! function_exists( '_s_admin_scripts' ) ) :
function _s_admin_scripts() {
    // Uncomment if using datepicker in admin
    // wp_enqueue_script('jquery-ui-datepicker', array('jquery'));
    // wp_enqueue_style('jquery-style', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.2/themes/smoothness/jquery-ui.css');
}
add_action( 'admin_enqueue_scripts', '_s_admin_scripts' );
endif;


if ( ! isset( $content_width ) ) $content_width = 1170;

/**
 * Register custom post types
 */

/* if ( ! function_exists( '_s_create_post_types' ) ) :
 * function _s_create_post_types() {
 *    register_post_type( 'things',
 *        array(
 *            'labels' => array(
 *                'name' => __( 'Things' ),
 *                'singular_name' => __( 'Thing' )
 *            ),
 *            'public' => true,
 *            'has_archive' => true,
 *            'add_new_item' => __( 'Add Thing' ),
 *            'edit_item' => __('Edit Thing'),
 *            'new_item' => __('New Thing')
 *        )
 *    );
 * }
 * add_action( 'init', '_s_create_post_types' );
 * endif; // _s_create_post_types
 */

/**
 * Add custom meta boxes
 */
/*if ( ! function_exists( '_s_meta_box_add' ) ) :
 *function _s_meta_box_add() {
 *    add_meta_box( 'thing-date', __( 'Thing date' ), '_s_meta_box_cb', 'things', 'side', 'default' );
 *}
 *add_action( 'add_meta_boxes', '_s_meta_box_add' );
 endif; // _s_meta_box_add
 *
 *if ( ! function_exists( '_s_meta_box_cb' ) ) :
 *function _s_meta_box_cb( $post ) {
 *    $values = get_post_custom( $post->ID );
 *    $thing_date = isset( $values['thing-date'] ) ? esc_attr( $values['thing-date'][0] ) : '';
 *    $thing_check = isset( $values['thing-check'] ) ? esc_attr( $values['thing-check'] ) : '';
 *    wp_nonce_field( '_s_meta_box_nonce', 'meta_box_nonce' );
 *    ?>
 *    <p>
 *        <label for="thing-date"><?php _e( 'Date', '_s' )?></label>
 *    </p>
 *    <p>
 *        //uncomment datepicker in enqueue admin scripts
 *        <script type="text/javascript">
 *        jQuery(function() {
 *            jQuery.datepicker.setDefaults( jQuery.datepicker.regional[ "fi" ] );
 *            jQuery('#input-thing-date').datepicker({
 *                dateFormat: 'dd.mm.yy'
 *            });
 *        });
 *        </script>
 *
 *        <input type="date" name="thing-date" id="input-thing-date" value="<?php echo $thing_date; ?>">
 *    </p>
 *    <p>
 *        <input type="checkbox" name="input-thing-check" id="input-thing-check" <?php checked( $thing_check, 'on' ); ?> />
 *        <label for="input-thing-check">Do you want this option?</label>
 *    </p>
 *    <?php
 *}
 *endif; // _s_meta_box_cb
 */

/**
 * Save custom meta boxes.
 */
/*if ( ! function_exists( '_s_meta_box_save' ) ) :
 *function _s_meta_box_save( $post_id ) {
 *    // Bail if we're doing an auto save
 *    if( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
 *
 *    // if our nonce isn't there, or we can't verify it, bail
 *    if( !isset( $_POST['meta_box_nonce'] ) || !wp_verify_nonce( $_POST['meta_box_nonce'], '_s_meta_box_nonce' ) ) return;
 *
 *    // if our current user can't edit this post, bail
 *    if( !current_user_can( 'edit_post', $post_id ) ) return;
 *
 *    // now we can actually save the data
 *    $allowed = array(
 *        'a' => array( // on allow a tags
 *            'href' => array() // and those anchors can only have href attribute
 *        )
 *    );
 *
 *    // Make sure your data is set before trying to save it
 *    if( isset( $_POST['thing-date'] ) )
 *        update_post_meta( $post_id, 'thing-date', wp_kses( $_POST['thing-date'], $allowed ) );
 *
 *    // Save check-boxes
 *    $chk = isset( $_POST['input-thing-check'] ) ? 'on' : 'off';
 *    update_post_meta( $post_id, 'input-thing-check', $chk );
 *
 *}
 *add_action( 'save_post', '_s_meta_box_save' );
 *endif; // _s_meta_box_save
 */


/*=============================================================
 *                           MEDIA                            *
 *============================================================*/

/**
 * Get attachment id from url
 */
if ( ! function_exists( '_s_get_image_id' ) ) :
function _s_get_image_id($image_url) {
    global $wpdb;
    $prefix = $wpdb->prefix;
    $attachment = $wpdb->get_col($wpdb->prepare("SELECT ID FROM " . $prefix . "posts" . " WHERE guid='%s';", $image_url ));
        return $attachment[0];
}
endif; // _s_get_image_id


/**
 * Get image attributes
 */
if ( ! function_exists( '_s_get_attachment' ) ) :
function _s_get_attachment( $attachment_id ) {

    $attachment = get_post( $attachment_id );
    return array(
        'alt' => get_post_meta( $attachment->ID, '_wp_attachment_image_alt', true ),
        'caption' => $attachment->post_excerpt,
        'description' => $attachment->post_content,
        'href' => get_permalink( $attachment->ID ),
        'src' => $attachment->guid,
        'title' => $attachment->post_title
    );
}
endif; // _s_get_attachment


/*=============================================================
 *                     MENUS AND WIDGETS                      *
 *============================================================*/

/**
 * Custom walker nav menu
 */
if ( ! class_exists( '_s_walker_header_nav_menu' ) ) :
class _s_walker_header_nav_menu extends Walker_Nav_Menu {
    // add classes to ul sub-menus
    function start_lvl( &$output, $depth = 0, $args = array() ) {
        // depth dependent classes
        $indent = ( $depth > 0  ? str_repeat( "\t", $depth ) : '' ); // code indent
        $display_depth = ( $depth + 1); // because it counts the first submenu as 0
        $classes = array(
            'page-header__nav-group  page-header__nav-subgroup',
            ( $display_depth % 2  ? 'page-header__nav-group--odd' : 'page-header__nav-group--even' ),
            ( $display_depth >=2 ? 'page-header__nav-subsubgroup' : '' ),
            'page-header__nav-group--depth-' . $display_depth
            );
        $class_names = implode( ' ', $classes );

        // build html
        $output .= "\n" . $indent . '<ul class="' . $class_names . '">' . "\n";
    }
    // add main/sub classes to li's and links
    function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
        global $wp_query;
        $indent = ( $depth > 0 ? str_repeat( "\t", $depth ) : '' ); // code indent

        // depth dependent classes
        $depth_classes = array(
            ( $depth == 0 ? 'page-header__nav-item' : 'page-header__nav-item  page-header__nav-subitem' ),
            ( $depth >=2 ? 'page-header__nav-item  page-header__nav-subitem' : '' ),
            ( $depth % 2 ? 'page-header__nav-item--odd' : 'page-header__nav-item--even' ),
            'page-header__nav-item--depth-' . $depth
            );
        $depth_class_names = esc_attr( implode( ' ', $depth_classes ) );
        // passed classes
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $class_names = esc_attr( implode( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) ) );
        // build html
        $output .= $indent . '<li id="nav-menu-item-'. $item->ID . '" class="' . $depth_class_names . ' ' . $class_names . '">';
        // link attributes
        $attributes  = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
        $attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
        $attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
        $attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';
        $attributes .= ' class="' . ( $depth > 0 ? 'page-header__nav-link  page-header__nav-subitem-link' : 'page-header__nav-link' ) . '"';
        $item_output = sprintf( '%1$s<a%2$s>%3$s%4$s%5$s</a>%6$s',
            $args->before,
            $attributes,
            $args->link_before,
            apply_filters( 'the_title', $item->title, $item->ID ),
            $args->link_after,
            $args->after
            );
        // build html
        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }
}

endif; // _s_walker_header_nav_menu


/**
 * Register widgetized area and update sidebar with default widgets
 */
if ( ! function_exists( '_s_widgets_init' ) ) :
function _s_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', '_s' ),
		'id'            => 'sidebar-1',
		'before_widget' => '<aside id="%1$s" class="widgets__widget  widgets__widget--%2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widgets__widget-title">',
		'after_title'   => '</h1>',
	) );
}
add_action( 'widgets_init', '_s_widgets_init' );
endif; // _s_widgets_init


/**
 * Load template widgets
 */
// Place theme widgets in inc/widgets and require them here
//require get_template_directory() . '/inc/widgets/widget-latest-cats.php';

//Register and load the widgets
/**
 *function _s_load_widget() {
 *    register_widget( '_s_latest_cats_widget' );
 *}
 *add_action( 'widgets_init', '_s_load_widget' );
 */


/*=============================================================
 *                           MISC                             *
 *============================================================*/


/**
 * Implement the Custom Header feature.
 */
//require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

/**
 * Load custom options
 */
require get_template_directory() . '/inc/options.php';
