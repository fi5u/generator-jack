<?php
/**
 * _s Theme Customizer
 *
 * @package _s
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function _s_customize_register( $wp_customize ) {
    /* Uncomment to add new customizer options

    // Only needed if need textarea
    require_once(TEMPLATEPATH . '/inc/customizer_classes/wp_customizer_textarea.php');

    $wp_customize->add_setting('textarea_option', array(
                               'default' => 'default text',
                               'transport' => 'postMessage',
                               ));

    $wp_customize->add_control(new _s_textarea_control($wp_customize, 'textarea_option', array(
        'label' => 'Textarea option',
        'section' => 'New Section',
        'settings' => 'textarea_option'
    )));

    $wp_customize->add_section( 'New Section' , array(
        'title'      => __( 'Site content', '_s' ),
        'priority'   => 30,
    ) );

    // For the template:

        <?php if(get_theme_mod( 'textarea_option')) : ?>
            <div class="textarea-option"><?php echo get_theme_mod( 'textarea_option' ); ?></div>
        <?php endif; ?>

    // Remember to add the field to js/customizer.js
    */

	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';
}
add_action( 'customize_register', '_s_customize_register' );

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function _s_customize_preview_js() {
	wp_enqueue_script( '_s_customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '20130508', true );
}
add_action( 'customize_preview_init', '_s_customize_preview_js' );
