<?php
class _sOptions
{
    /**
     * Holds the values to be used in the fields callbacks
     */
    private $options;

    /**
     * Start up
     */
    public function __construct()
    {
        add_action( 'admin_menu', array( $this, 'add_contents_settings' ) );
        add_action( 'admin_init', array( $this, 'page_init' ) );
    }

    /**
     * Add options page
     */
    public function add_contents_settings()
    {
        // This page will be under "Settings"
        add_options_page(
            'Special theme settings', // Page title
            'Theme settings', // Menu title
            'manage_options', // Capability
            'theme-settings', // Menu slug
            array( $this, 'create_admin_page' ) // Function
        );
    }

    /**
     * Options page callback
     */
    public function create_admin_page()
    {
        // Set class property
        $this->options = get_option( '_s_option_name' );
        ?>
        <div class="wrap">
            <?php screen_icon(); ?>
            <h2>Special theme settings</h2>
            <form method="post" action="options.php">
            <?php
                // This prints out all hidden setting fields
                settings_fields( '_s_option_group' );
                do_settings_sections( 'theme-settings' );
                submit_button();
            ?>
            </form>
        </div>
        <?php
    }

    /**
     * Register and add settings
     */
    public function page_init()
    {
        register_setting(
            '_s_option_group', // Option group
            '_s_option_name', // Option name
            array( $this, 'sanitize' ) // Sanitize
        );

        add_settings_section(
            'setting_section_first', // ID
            __( 'Theme Settings - First', '_s'), // Title
            array( $this, 'print_section_info' ), // Callback
            'theme-settings' // Page
        );

            add_settings_field(
                'settings_field_1', // ID
                __( 'Settings Field 1', '_s'), // Title
                array( $this, 'settings_field_1_callback' ), // Callback
                'theme-settings', // Page
                'setting_section_first', // Section
                array( 'label_for' => 'settings_field_1', 'custom_param' => 1 ) // Params to pass
            );

            add_settings_field(
                'settings_field_img', // ID
                __('Settings Field Image', '_s'), // Title
                array( $this, 'settings_field_img_callback' ), // Callback
                'theme-settings', // Page
                'setting_section_first', // Section
                array( 'label_for' => 'settings_field_img', 'custom_param' => 1 ) // Params to pass
            );

            add_settings_field(
                'settings_field_img_preview', // ID
                __('Settings Field Image Preview', '_s'), // Title
                array( $this, 'settings_field_img_preview_callback' ), // Callback
                'theme-settings', // Page
                'setting_section_first', // Section
                array( 'label_for' => 'settings_field_img_preview', 'custom_param' => 1 ) // Params to pass
            );
    }

    /**
     * Sanitize each setting field as needed
     *
     * @param array $input Contains all settings fields as array keys
     */
    public function sanitize( $input )
    {
        $new_input = array();

        $allowed = array(
            'a' => array(
                'href' => array(),
                'title' => array()
            ),
            'br' => array(),
            'em' => array(),
            'strong' => array()
        );

        if( isset( $input['settings_field_1'] ) )
            //$new_input['settings_field_1'] = $input['settings_field_1']; // For unsanitized
            //$new_input['settings_field_1'] = sanitize_text_field( $input['settings_field_1'] ); // For plain text
            $new_input['settings_field_1'] = wp_kses( $input['settings_field_1'], $allowed ); // For basic HTML

        if( isset( $input['settings_field_img'] ) )
            $new_input['settings_field_img'] = $input['settings_field_img']; // <- SANITIZE URL? esc_url_raw() ?

        if( isset( $input['settings_field_img_preview'] ) )
            $new_input['settings_field_img_preview'] = $input['settings_field_img_preview'];

        return $new_input;
    }

    /**
     * Print the section text
     */
    public function print_section_info($e)
    {
        print __('Set ' . $e['title'] . ' options below:');
    }

    /**
     * Get the settings option array and print one of its values
     */
    public function settings_field_1_callback($n)
    {
        // To use a passed param:
        // $n = $n['custom_param']
        // echo $n
        printf(
            '<textarea id="settings_field_1" name="_s_option_name[settings_field_1]">%s</textarea>',
            isset( $this->options['settings_field_1'] ) ? esc_attr( $this->options['settings_field_1']) : ''
        );
    }

    public function settings_field_img_callback() {
        printf(
            '<input type="hidden" id="settings_field_img" name="_s_option_name[settings_field_img]" value="%s">
                <input class="img_upload_btn" id="settings_field_img_button" type="button" value="Upload Image">',
            isset( $this->options['settings_field_img'] ) ? esc_url( $this->options['settings_field_img']) : ''
        );
    }

    public function settings_field_img_preview_callback() {
        $_s_option = get_option( '_s_option_name' );
        $img = _s_get_image_id($_s_option['settings_field_img'] );
        $img_attr = wp_get_attachment_image_src( $img, 'medium' ); // Change image size here if needed ?>

        <div id="settings_field_img_preview" style="min-height: 100px;">
            <img style="max-width:100%;" src="<?php echo esc_url($img_attr[0]); ?>">
        </div>
        <?php
    }
}

if( is_admin() )
    $_s_settings_page = new _sOptions();

/*****************/

 /**
 * Collects our theme options
 *
 * @return array
 */
function _s_get_global_options() {

    $_s_option = array();

    $_s_option  = get_option('_s_option_name');

return $_s_option;
}

 /**
 * Call the function and collect in variable
 *
 * Should be used in template files like this:
 * <?php echo $_s_option['footer_text_upper']; ?>
 *
 * Note: Should you notice that the variable ($_s_option) is empty when used in certain templates such as header.php, sidebar.php and footer.php
 * you will need to call the function (copy the line below and paste it) at the top of those documents (within php tags)!
 */
$_s_option = _s_get_global_options();


/*****************/
function _s_options_enqueue_scripts() {
    wp_register_script( 'options', get_template_directory_uri() .'/assets/js/options.js', array('jquery','media-upload','thickbox'), '20140101', true );

    if ( 'settings_page_theme-settings' == get_current_screen() -> id ) {
        wp_enqueue_script('jquery');

        wp_enqueue_script('thickbox');
        wp_enqueue_style('thickbox');

        wp_enqueue_script('media-upload');
        wp_enqueue_script('options');
        wp_localize_script( 'options', 'objectL10n', array(
            'select_image'  => __( 'Select image', '_s')
        ) );
    }
}
add_action('admin_enqueue_scripts', '_s_options_enqueue_scripts');


function _s_options_setup() {
    global $pagenow;

    if ( 'media-upload.php' == $pagenow || 'async-upload.php' == $pagenow ) {
        // Now we'll replace the 'Insert into Post Button' inside Thickbox
        add_filter( 'gettext', '_s_replace_thickbox_text', 1, 3 );
    }
}
add_action( 'admin_init', '_s_options_setup' );

function _s_replace_thickbox_text($translated_text, $text, $domain) {
    if ('Insert into Post' == $text) {
        $referer = strpos( wp_get_referer(), '_s-settings' );
        if ( $referer != '' ) {
            return __('Upload this image', '_s' );
        }
    }
    return $translated_text;
}
